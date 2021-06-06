using Common;
using Common.ConfigSource;
using QueryOperator.Builder.Connection;
using QueryOperator.Builder.QueryExecutor;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace QueryManager
{
  public class QueryOperatorManager : IQueryOperatorManager<DbServiceType>
  {
    public int RequestWaitingTime { get; private set; }
    public int MaxRequestTimeout { get; private set; }
    public string EncryptMD5HashFormat { get; private set; }
    public string EncryptMD5HashCultureInfo { get; private set; }

    public event QueryExecutedEventHandler OnQueryExecuted;
    public event QueuedQueryExecutedEventHandler OnQueuedQueryExecuted;
    public event QueuedQueryCancelledEventHandler OnQueuedQueryCancelled;

    private readonly IQueryExecutor _queryExecutor;
    private readonly IList<IQueryExecutor> _queueQueryExecutors;
    private readonly ConcurrentQueue<QueryRequestParam> _queueRequest;
    private readonly IList<Task> _queryTasks;
    private readonly Thread _queryTaskWatcher;
    private bool _shouldWatcherActive;
    private readonly object _lockObject;
    private readonly int _maxQueueCount;
    private readonly int _threadPoolWaitingTime;

    public QueryOperatorManager(IConfigSource dbConfigSource)
    {
      DbServiceType dbServiceType = dbConfigSource.GetValue("DbServiceType", default(DbServiceType));
      string connectionString = dbConfigSource.GetValue("ConnectionString", string.Empty);
      Console.WriteLine(connectionString);
      _maxQueueCount = dbConfigSource.GetValue("MaxQueueCount", 0);
      int threadCount = dbConfigSource.GetValue("ThreadCount", 0);
      _threadPoolWaitingTime = dbConfigSource.GetValue("ThreadPoolWaitingTime", 0);
      RequestWaitingTime = dbConfigSource.GetValue("RequestWaitingTime", 0);
      MaxRequestTimeout = dbConfigSource.GetValue("MaxRequestTimeout", 0);
      EncryptMD5HashFormat = dbConfigSource.GetValue("HashFormat", string.Empty);
      EncryptMD5HashCultureInfo = dbConfigSource.GetValue("HashCultureInfo", string.Empty);

      IDbConnectionBuilder<DbServiceType> connBuilder = new DbConnectionBuilder(dbServiceType, connectionString);
      IQueryExecutorBuilder<DbServiceType> queryExecutorBuilder = new QueryExecutorBuilder(dbServiceType, dbConfigSource);

      _queryExecutor = queryExecutorBuilder.Build();
      _queryExecutor.AssignConnection(connBuilder.Build());
      _queueRequest = new ConcurrentQueue<QueryRequestParam>();
      _queryTasks = new List<Task>();
      _queueQueryExecutors = new List<IQueryExecutor>();
      _lockObject = new object();

      for (int i = 0; i < threadCount; i++)
      {
        _queryTasks.Add(new Task(() => { }));
        _queueQueryExecutors.Add(queryExecutorBuilder.Build());
        _queueQueryExecutors[i].AssignConnection(connBuilder.Build());
      }

      if (threadCount > 0)
        _queryTaskWatcher = new Thread(() => MonitorQueryTask());
    }

    private void MonitorQueryTask()
    {
      while( _shouldWatcherActive )
      {
        if( _queueRequest.Count == 0 )
        {
          Thread.Sleep( _threadPoolWaitingTime );
          continue;
        }

        for( int taskId = 0; taskId < _queryTasks.Count; taskId++ )
        {
          QueryRequestParam reqParam;

          lock( _lockObject )
            if( !_queueRequest.TryDequeue( out reqParam ) )
              break;

          bool freeTaskFound = _queryTasks[ taskId ].Status == TaskStatus.Created ||
              _queryTasks[ taskId ].Status == TaskStatus.RanToCompletion ||
              _queryTasks[ taskId ].Status == TaskStatus.Faulted ||
              _queryTasks[ taskId ].Status == TaskStatus.Canceled;

          if( freeTaskFound )
            try
            {
              _queryTasks[ taskId ] = new Task( () =>
              {
                ExecuteQuery( reqParam, taskId, true );
              } );
              _queryTasks[ taskId ].Start();
            }
            catch( Exception e )
            {
              Console.WriteLine( "    [{0}] Error! {1}", Thread.CurrentThread.ManagedThreadId, e.Message );
            }
        }

        Thread.Sleep( _threadPoolWaitingTime );
      }
    }

    private void ExecuteQuery( QueryRequestParam reqParam, int taskId, bool isNeedReturnValue, bool isFromQueue = false )
    {
      IQueryExecutor queryExecutor = _queryExecutor;

      if( taskId > -1 )
        queryExecutor = _queueQueryExecutors[ taskId ];

      int retryCounter = 0;

      while( queryExecutor.ConnectionState != ConnectionState.Open && retryCounter < 10 )
      {
        Thread.Sleep( 100 );
        retryCounter++;
      }

      try
      {
        if ( queryExecutor.ConnectionState != ConnectionState.Open )
        {
          InvokeEvent( reqParam, null, new Exception( "unable to start transaction" ), isNeedReturnValue, isFromQueue );
          return;
        }

        QueryResult result = null;

        lock( _lockObject )
        {
          queryExecutor.ChangeDbTransState( DbTransactionState.Start );
          result = queryExecutor.ExecuteQuery( reqParam );
          queryExecutor.ChangeDbTransState( DbTransactionState.Commit );
        }

        InvokeEvent( reqParam, result, null, isNeedReturnValue, isFromQueue );
      }
      catch( Exception e )
      {
        queryExecutor.ChangeDbTransState( DbTransactionState.Rollback );
        InvokeEvent( reqParam, null, e, isNeedReturnValue, isFromQueue );
        Console.WriteLine("    [{0}] Error! {1}", Thread.CurrentThread.ManagedThreadId, e.Message);
      }
    }

    private void InvokeEvent( QueryRequestParam reqParam, QueryResult result, Exception e, bool isNeedReturnValue, bool isFromQueue )
    {
      if( !isNeedReturnValue )
        return;

      if(e == null && result != null)
      {
        if( isFromQueue )
          OnQueuedQueryExecuted?.Invoke( this, result );
        else
          OnQueryExecuted?.Invoke( this, result );

        return;
      }

      if( e != null )
      {
        if( isFromQueue )
          OnQueuedQueryExecuted?.Invoke( this, new QueryResult( ( reqParam == null ? "" : reqParam.Uuid ), ( reqParam == null ? "" : reqParam.RequestCode ), false, e.Message ) );
        else
          OnQueryExecuted?.Invoke( this, new QueryResult( ( reqParam == null ? "" : reqParam.Uuid ), ( reqParam == null ? "" : reqParam.RequestCode ), false, e.Message ) );
      }
    }

    public IRequestResult OpenDbConnection()
    {
      try
      {
        _queryExecutor.ChangeDbTransState( DbTransactionState.Open );

        foreach ( IQueryExecutor qryExec in _queueQueryExecutors )
          qryExec.ChangeDbTransState( DbTransactionState.Open );

        if (_queryTaskWatcher != null)
        {
          _shouldWatcherActive = true;
          _queryTaskWatcher.Start();
        }

        return new RequestResult( true, CommonMessage.SUCCESS );
      }
      catch( Exception e )
      {
        return new RequestResult( false, e.Message );
      }
    }

    public IRequestResult ExecuteQuery( QueryRequestParam queryRequestParam, bool isNeedReturnValue = true )
    {
      try
      {
        Task.Run( () => ExecuteQuery( queryRequestParam, -1, isNeedReturnValue ) );
        return new RequestResult( true, CommonMessage.SUCCESS );
      }
      catch( Exception e )
      {
        return new RequestResult( false, e.Message );
      }
    }

    public IRequestResult EnqueueQuery( QueryRequestParam queryRequestParam )
    {
      try
      {
        lock( _lockObject )
        {
          if( _queueRequest.Count == _maxQueueCount )
            return new RequestResult( true, "exceed queue max count" );

          _queueRequest.Enqueue( queryRequestParam );
        }

        return new RequestResult( true, CommonMessage.SUCCESS );
      }
      catch( Exception e )
      {
        return new RequestResult( false, e.Message );
      }

    }

    public IRequestResult CloseDbConnection()
    {
      try
      {
        if (_queryTaskWatcher != null)
        {
          _shouldWatcherActive = false;
          _queryTaskWatcher.Join();
        }

        while( _queueRequest.TryDequeue( out QueryRequestParam param ) )
          OnQueuedQueryCancelled?.Invoke( this, "Database connection is closed", param );

        _queryExecutor.ChangeDbTransState( DbTransactionState.Close );

        foreach( IQueryExecutor qryExec in _queueQueryExecutors )
          qryExec.ChangeDbTransState( DbTransactionState.Close );

        return new RequestResult( true, CommonMessage.SUCCESS );
      }
      catch( Exception e )
      {
        return new RequestResult( false, e.Message );
      }
    }

    public void Dispose()
    {
      _queryExecutor.Dispose();

      foreach( IQueryExecutor qryExec in _queueQueryExecutors )
        qryExec.Dispose();
    }
  }
}
