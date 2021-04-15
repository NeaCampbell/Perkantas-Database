using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Controllers
{
  public abstract class QueryControllerBase : ControllerBase
  {
    protected ILogger<QueryControllerBase> Logger { get; private set; }
    protected IQueryOperatorManager<DbServiceType> QueryOperatorManager { get; private set; }
    protected string RequestId { get; private set; }

    private QueryResult _queryResult;
    private readonly int _requestWaitingTime;
    private readonly int _maxRequestTimeout;
    private readonly object _lockObject;

    public QueryControllerBase( ILogger<QueryControllerBase> logger
        , IQueryOperatorManager<DbServiceType> queryOperatorManager )
    {
      Logger = logger;
      QueryOperatorManager = queryOperatorManager;
      _requestWaitingTime = queryOperatorManager.RequestWaitingTime;
      _maxRequestTimeout = queryOperatorManager.MaxRequestTimeout;
      _lockObject = new object();
    }

    protected virtual QueryResult ExecuteRequest( IList<string> param, string strProcessType, string requestCode, bool isSingleRow = false )
    {
      ProcessType processType = GetProcessType( strProcessType );
      RequestId = string.Format( "{0}_{1}_{2}", HttpContext.Session.Id, GetType().Name.ToString(), processType );

      if( string.IsNullOrEmpty( requestCode ) )
        return new QueryResult( RequestId, requestCode, false, "invalid request code" );

      Console.WriteLine();
      Console.WriteLine( "================" );
      Console.WriteLine( "request id = {0}", RequestId );
      QueryOperatorManager.OnQueryExecuted += OnQueryExecutedHandler;

      try
      {
        QueryRequestParam reqParam = new QueryRequestParam( processType, requestCode, param, RequestId, isSingleRow );

        IRequestResult reqResult = QueryOperatorManager.ExecuteQuery( reqParam );

        if( !reqResult.Result )
          return new QueryResult( RequestId, requestCode, false, reqResult.Message );

        CancellationTokenSource tokenSource = new CancellationTokenSource();
        tokenSource.CancelAfter( _maxRequestTimeout );

        Task<QueryResult> task = Task.Run( () =>
         {
           while( _queryResult == null )
             Thread.Sleep( _requestWaitingTime );

           return _queryResult;
         } );

        task.Wait( tokenSource.Token );

        return task.Result;
      }
      catch( Exception ex )
      {
        return new QueryResult( RequestId, requestCode, false, ex.Message );
      }
    }

    protected virtual QueryResult EnqueueRequest( IList<string> param, string strProcessType, string requestCode, bool isSingleRow = false )
    {
      ProcessType processType = GetProcessType( strProcessType );
      RequestId = string.Format( "{0}_{1}_{2}", HttpContext.Session.Id, GetType().Name.ToString(), ProcessType.Select );

      if( string.IsNullOrEmpty( requestCode ) )
        return new QueryResult( RequestId, requestCode, false, "invalid request code" );

      Console.WriteLine();
      Console.WriteLine( "================" );
      Console.WriteLine( "request id = {0}", RequestId );
      QueryOperatorManager.OnQueuedQueryExecuted += OnQueuedQueryExecutedHandler;

      try
      {
        QueryRequestParam reqParam = new QueryRequestParam( processType, requestCode, param, RequestId, isSingleRow );
        IRequestResult reqResult = QueryOperatorManager.EnqueueQuery( reqParam );

        if( !reqResult.Result )
          return new QueryResult( RequestId, requestCode, false, reqResult.Message );

        return new QueryResult( RequestId, requestCode, true, "" );
      }
      catch( Exception ex )
      {
        return new QueryResult( RequestId, requestCode, false, ex.Message );
      }
    }

    protected TModel GetModelFromQueryResult<TModel>( QueryResult result ) where TModel : class
    {
      if( string.IsNullOrEmpty( result.Result ) )
        return null;

      return JsonConvert.DeserializeObject<IList<TModel>>( result.Result )[ 0 ];
    }

    protected IList<TModel> GetModelListFromQueryResult<TModel>( QueryResult result ) where TModel : class
    {
      if( string.IsNullOrEmpty( result.Result ) )
        return null;

      return JsonConvert.DeserializeObject<IList<TModel>>( result.Result );
    }

    protected Response<TModel> GetResponseBlankSingleModel<TModel>( QueryResult result, bool succeed, bool isUseResultSucceedValue = true ) where TModel : class
    {
      return new Response<TModel>( result.RequestId, result.RequestCode, isUseResultSucceedValue ? result.Succeed : succeed, result.ErrorMessage, null );
    }

    protected Response<IList<TModel>> GetResponseBlankMultiModels<TModel>( QueryResult result, bool succeed, bool isUseResultSucceedValue = true ) where TModel : class
    {
      return new Response<IList<TModel>>( result.RequestId, result.RequestCode, isUseResultSucceedValue ? result.Succeed : succeed, result.ErrorMessage, null );
    }

    protected Response<TModel> GetResponseSingleModel<TModel>( QueryResult result ) where TModel : class
    {
      if(string.IsNullOrEmpty( result.Result))
        return new Response<TModel>( result.RequestId, result.RequestCode, false, "data not found!" );

      Console.WriteLine( result.Result );

      TModel model = JsonConvert.DeserializeObject<IList<TModel>>( result.Result )[ 0 ];
      return new Response<TModel>( result.RequestId, result.RequestCode, result.Succeed, result.ErrorMessage, model );
    }

    protected Response<IList<TModel>> GetResponseMultiModels<TModel>( QueryResult result ) where TModel : class
    {
      if( string.IsNullOrEmpty( result.Result ) )
        return new Response<IList<TModel>>( result.RequestId, result.RequestCode, false, "data not found!" );

      IList<TModel> models = JsonConvert.DeserializeObject<IList<TModel>>( result.Result );
      return new Response<IList<TModel>>( result.RequestId, result.RequestCode, result.Succeed, result.ErrorMessage, models );
    }

    private void OnQueryExecutedHandler( object sender, QueryResult result )
    {
      lock( _lockObject )
        _queryResult = result;

      QueryOperatorManager.OnQueryExecuted -= OnQueryExecutedHandler;
    }

    protected virtual void OnQueuedQueryExecutedHandler( object sender, QueryResult result )
    {
      QueryOperatorManager.OnQueuedQueryExecuted -= OnQueuedQueryExecutedHandler;
    }

    private ProcessType GetProcessType( string requestType )
    {
      switch( requestType.ToLower() )
      {
        case ConstRequestType.GET:
          return ProcessType.Select;
        case ConstRequestType.POST:
          return ProcessType.Insert;
        case ConstRequestType.PUT:
          return ProcessType.Update;
        case ConstRequestType.DELETE:
          return ProcessType.Delete;
        default:
          return default;
      }
    }
  }
}
