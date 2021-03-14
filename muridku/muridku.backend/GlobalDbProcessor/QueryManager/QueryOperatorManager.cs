using Common;
using Common.ConfigSource;
using QueryOperator.Builder.Connection;
using QueryOperator.Builder.QueryExecutor;
using QueryOperator.QueryExecutor;
using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace QueryManager
{
    public class QueryOperatorManager : IQueryOperatorManager<DbServiceType>
    {
        public IQueryExecutor<DbServiceType> QueryExecutor { get; private set; }
        public event QueryExecutedEventHandler OnQueryExecuted;
        public event QueuedQueryExecutedEventHandler OnQueuedQueryExecuted;
        public event QueuedQueryCancelledEventHandler OnQueuedQueryCancelled;

        private readonly IDbConnection _dbConnection;
        private readonly IQueryExecutor _queryExecutor;
        private ConcurrentQueue<QueryRequestParam> _queueRequest;
        private readonly IList<Task> _queryTasks;
        private readonly object _lockObject;
        private readonly Thread _queryTaskWatcher;
        private bool _shouldWatcherActive;

        public QueryOperatorManager(DbServiceType dbServiceType, string connectionString, IConfigSource dbConfigSource, int threadCount)
        {
            IDbConnectionBuilder<DbServiceType> connBuilder = new DbConnectionBuilder(dbServiceType, connectionString);
            IQueryExecutorBuilder<DbServiceType> queryBuilder = new QueryExecutorBuilder(dbServiceType, dbConfigSource);
            Console.WriteLine(connectionString);
            _dbConnection = connBuilder.Build();
            _queryExecutor = queryBuilder.Build();
            _queryExecutor.AssignConnection(_dbConnection);
            _queueRequest = new ConcurrentQueue<QueryRequestParam>();
            _queryTasks = new List<Task>();

            for (int i = 0; i < threadCount; i++)
                _queryTasks.Add(new Task(() => ExecuteQueuedQuery()));

            _lockObject = new object();
            _queryTaskWatcher = new Thread(() => MonitorQueryTask());
        }

        private void MonitorQueryTask()
        {
            while(_shouldWatcherActive)
            {
                if(_queueRequest.Count > 0)
                {
                    bool[] taskAvailibility = new bool[_queryTasks.Count];

                    for(int taskId = 0; taskId < _queryTasks.Count; taskId++)
                    {
                        if (_queueRequest.Count == 0)
                            break;

                        Console.WriteLine("    [{0}] task {1} status = {2}", Thread.CurrentThread.ManagedThreadId, taskId, _queryTasks[taskId].Status);
                        bool freeTaskFound = _queryTasks[taskId].Status == TaskStatus.Created ||
                            _queryTasks[taskId].Status == TaskStatus.RanToCompletion ||
                            _queryTasks[taskId].Status == TaskStatus.Faulted ||
                            _queryTasks[taskId].Status == TaskStatus.Canceled;

                        if (freeTaskFound)
                            try
                            {
                                if (_queryTasks[taskId].Status != TaskStatus.Created)
                                    _queryTasks[taskId] = new Task(() => ExecuteQueuedQuery());

                                _queryTasks[taskId].Start();
                            }
                            catch (Exception e)
                            {
                                Console.WriteLine("    Error! {0}", e.Message);
                            }
                    }
                }

                Thread.Sleep(500);
            }
        }

        private void DirectlyExecuteQuery(QueryRequestParam reqParam)
        {
            try
            {
                if (_dbConnection.State == ConnectionState.Closed)
                    _dbConnection.Open();

                QueryResult result = _queryExecutor.ExecuteQuery(reqParam);
                OnQueryExecuted?.Invoke(this, result);
                Console.WriteLine("    [{0}] Query executed", Thread.CurrentThread.ManagedThreadId);
            }
            catch (Exception e)
            {
                OnQueryExecuted?.Invoke(this, new QueryResult(reqParam.Uuid, reqParam.RequestCode, false, e.Message));
                Console.WriteLine("    Error! {0}", e.Message);
            }
        }

        private void ExecuteQueuedQuery()
        {
            QueryRequestParam reqParam = null;

            try
            {
                if (_queueRequest.TryDequeue(out reqParam))
                {
                    if (_dbConnection.State == ConnectionState.Closed)
                        _dbConnection.Open();

                    QueryResult result = _queryExecutor.ExecuteQuery(reqParam);
                    OnQueuedQueryExecuted?.Invoke(this, result);
                    Console.WriteLine("    Enqueued query {0} executed, queue residue = {1}", reqParam.Uuid, _queueRequest.Count);
                }
                else
                    Console.WriteLine("    Failed to dequeue query, queue residue = {0}", _queueRequest.Count);
            }
            catch(Exception e)
            {
                OnQueuedQueryExecuted?.Invoke(this, new QueryResult((reqParam == null ? "" : reqParam.Uuid), (reqParam == null ? "" : reqParam.RequestCode), false, e.Message));
                Console.WriteLine("    Error! {0}", e.Message);
            }
        }

        public bool OpenDbConnection()
        {
            try
            {
                _dbConnection.Open();
                _shouldWatcherActive = true;
                _queryTaskWatcher.Start();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool ExecuteQuery(QueryRequestParam queryRequestParam)
        {
            try
            {
                Task.Run(() => DirectlyExecuteQuery(queryRequestParam));
                Console.WriteLine("    [{0}] Query execution requested", Thread.CurrentThread.ManagedThreadId);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool EnqueueQuery(QueryRequestParam queryRequestParam)
        {
            try
            {
                _queueRequest.Enqueue(queryRequestParam);
                Console.WriteLine("    Query Enqueued");
                return true;
            }
            catch
            {
                return false;
            }

        }

        public bool CloseDbConnection()
        {
            try
            {
                _shouldWatcherActive = false;
                _queryTaskWatcher.Join();

                QueryRequestParam param;

                while (_queueRequest.TryDequeue(out param))
                    OnQueuedQueryCancelled?.Invoke(this, "Database connection is closed", param);

                if (_dbConnection.State == ConnectionState.Open)
                    _dbConnection.Close();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Dispose()
        {
            if(_dbConnection != null)
                _dbConnection.Dispose();
        }
    }
}
