using Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models;
using Muridku.QueryRequestReceiver.Models.Params;
using Newtonsoft.Json;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Controllers
{
  public abstract class QueryControllerBase : ControllerBase
  {
    private const string _saveApiLog = "saveapilog";
    private const string USER_SYSTEM = "SYSTEM";
    private const string MSG_INVALID_USERNAME = "invalid username";
    private const string MSG_INVALID_REQUEST_CODE = "invalid request code";
    protected ILogger<QueryControllerBase> Logger { get; private set; }
    protected IQueryOperatorManager<DbServiceType> QueryOperatorManager { get; private set; }
    protected string RequestId { get; private set; }
    protected string Username { get; private set; }

    private QueryResult _queryResult;
    private readonly int _requestWaitingTime;
    private readonly int _maxRequestTimeout;
    private readonly object _lockObject;
    private readonly string _localIpAddress;

    public QueryControllerBase( ILogger<QueryControllerBase> logger
        , IQueryOperatorManager<DbServiceType> queryOperatorManager )
    {
      Logger = logger;
      QueryOperatorManager = queryOperatorManager;
      _requestWaitingTime = queryOperatorManager.RequestWaitingTime;
      _maxRequestTimeout = queryOperatorManager.MaxRequestTimeout;
      _lockObject = new object();
      _localIpAddress = GetLocalIPv4();
    }

    protected virtual QueryResult ExecuteRequest<TModel>( LogApi logApi, IList<string> param, string strProcessType,
      string requestCode, bool isSingleRow = false, Func<CheckParam>[] preCheckFuncs = null,
      Func<TModel, CheckParam>[] postCheckFuncs = null, bool isNeedValidUser = false ) where TModel : class
    {
      ProcessType processType = GetProcessType( strProcessType );
      RequestId = string.Format( "{0}_{1}_{2}", HttpContext.Session.Id, GetType().Name.ToString(), processType );
      string username = GetUsernameFromHeader( HttpContext );
      logApi.request_id = RequestId;
      logApi.usr_crt = username;

      Logger.LogInformation( "request id = {0}", RequestId );

      if( isNeedValidUser && username == USER_SYSTEM )
        return SetResponseForFailedRequest( logApi, 400, MSG_INVALID_USERNAME );

      if( string.IsNullOrEmpty( requestCode ) )
        return SetResponseForFailedRequest( logApi, 400, MSG_INVALID_REQUEST_CODE );

      CheckParam checkParam = PreExecCheck( preCheckFuncs );

      if( !checkParam.CheckResult )
        return SetResponseForFailedRequest( logApi, 400, checkParam.Message );

      QueryOperatorManager.OnQueryExecuted += OnQueryExecutedHandler;

      try
      {
        QueryRequestParam reqParam = new QueryRequestParam( processType, requestCode, param, RequestId, isSingleRow );
        IRequestResult reqResult = QueryOperatorManager.ExecuteQuery( reqParam );

        if( !reqResult.Result )
          return SetResponseForFailedRequest( logApi, 500, reqResult.Message );

        CancellationTokenSource tokenSource = new CancellationTokenSource();
        tokenSource.CancelAfter( _maxRequestTimeout );

        Task<QueryResult> task = Task.Run( () =>
         {
           while( _queryResult == null )
             Thread.Sleep( _requestWaitingTime );

           return _queryResult;
         } );

        task.Wait( tokenSource.Token );
        QueryResult result = task.Result;

        if( !string.IsNullOrEmpty( result.ErrorMessage ) )
          return SetResponseForFailedRequest( logApi, 500, result.ErrorMessage );

        IList<TModel> models = null;

        if( isSingleRow )
        {
          TModel model = GetModelFromQueryResult<TModel>( result );
          models = new List<TModel>() { model };
        }
        else
          models = GetModelListFromQueryResult<TModel>( result );

        checkParam = PostExecCheck( models, isSingleRow, postCheckFuncs );

        if( !checkParam.CheckResult )
          return SetResponseForFailedRequest( logApi, 400, checkParam.Message, result );

        return SetResponseForSuceedRequest( logApi, JsonConvert.SerializeObject( result ), result );
      }
      catch( Exception ex )
      {
        return SetResponseForFailedRequest( logApi, 500, ex.Message );
      }
    }

    protected virtual QueryResult EnqueueRequest( LogApi logApi, IList<string> param, string strProcessType, string requestCode, bool isSingleRow = false,
      Func<CheckParam>[] preCheckFuncs = null, bool isNeedValidUser = false )
    {
      ProcessType processType = GetProcessType( strProcessType );
      RequestId = string.Format( "{0}_{1}_{2}", HttpContext.Session.Id, GetType().Name.ToString(), ProcessType.Select );
      string username = GetUsernameFromHeader( HttpContext );
      logApi.request_id = RequestId;
      logApi.usr_crt = username;

      Logger.LogInformation( "request id = {0}", RequestId );

      if( isNeedValidUser && username == USER_SYSTEM )
        return SetResponseForFailedRequest( logApi, 400, MSG_INVALID_USERNAME );

      if( string.IsNullOrEmpty( requestCode ) )
        return SetResponseForFailedRequest( logApi, 500, MSG_INVALID_REQUEST_CODE );

      CheckParam checkParam = PreExecCheck( preCheckFuncs );

      if( !checkParam.CheckResult )
        return SetResponseForFailedRequest( logApi, 400, checkParam.Message );

      QueryOperatorManager.OnQueuedQueryExecuted += OnQueuedQueryExecutedHandler;

      try
      {
        QueryRequestParam reqParam = new QueryRequestParam( processType, requestCode, param, RequestId, isSingleRow );
        IRequestResult reqResult = QueryOperatorManager.EnqueueQuery( reqParam );

        if( !reqResult.Result )
          return SetResponseForFailedRequest( logApi, 500, reqResult.Message );

        QueryResult result = new QueryResult( RequestId, requestCode, true, "" );
        return SetResponseForSuceedRequest( logApi, JsonConvert.SerializeObject( result ), result );
      }
      catch( Exception ex )
      {
        return SetResponseForFailedRequest( logApi, 500, ex.Message );
      }
    }

    protected TModel GetModelFromQueryResult<TModel>( QueryResult result ) where TModel : class
    {
      if( string.IsNullOrEmpty( result.Result ) )
        return null;

      return JsonConvert.DeserializeObject<TModel>( result.Result );
    }

    protected IList<TModel> GetModelListFromQueryResult<TModel>( QueryResult result ) where TModel : class
    {
      if( string.IsNullOrEmpty( result.Result ) )
        return null;

      return JsonConvert.DeserializeObject<IList<TModel>>( result.Result );
    }

    protected Response<TModel> GetResponseBlankSingleModel<TModel>( QueryResult result, bool succeed, string errorMessage = null, bool isUseResultSucceedValue = true ) where TModel : class
    {
      return new Response<TModel>( result.RequestId, result.RequestCode, isUseResultSucceedValue ? result.Succeed : succeed, errorMessage ?? result.ErrorMessage, null );
    }

    protected Response<IList<TModel>> GetResponseBlankMultiModels<TModel>( QueryResult result, bool succeed, string errorMessage = null, bool isUseResultSucceedValue = true ) where TModel : class
    {
      return new Response<IList<TModel>>( result.RequestId, result.RequestCode, isUseResultSucceedValue ? result.Succeed : succeed, errorMessage ?? result.ErrorMessage, null );
    }

    protected Response<TModel> GetResponseSingleModel<TModel>( QueryResult result ) where TModel : class
    {
      if(string.IsNullOrEmpty( result.Result))
        return new Response<TModel>( result.RequestId, result.RequestCode, false, "data not found!" );

      TModel model = JsonConvert.DeserializeObject<TModel>( result.Result );
      return new Response<TModel>( result.RequestId, result.RequestCode, result.Succeed, result.ErrorMessage, model );
    }

    protected Response<TModel> GetResponseSingleModelCustom<TModel>( QueryResult result, TModel model ) where TModel : class
    {
      return new Response<TModel>( result.RequestId, result.RequestCode, result.Succeed, result.ErrorMessage, model );
    }

    protected Response<IList<TModel>> GetResponseMultiModels<TModel>( QueryResult result ) where TModel : class
    {
      if( string.IsNullOrEmpty( result.Result ) )
        return new Response<IList<TModel>>( result.RequestId, result.RequestCode, false, "data not found!" );

      IList<TModel> models = JsonConvert.DeserializeObject<IList<TModel>>( result.Result );
      return new Response<IList<TModel>>( result.RequestId, result.RequestCode, result.Succeed, result.ErrorMessage, models );
    }

    protected Response<IList<TModel>> GetResponseMultiModelsCustom<TModel>( QueryResult result, IList<TModel> models ) where TModel : class
    {
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

    protected void SaveLogApi( LogApi logApi )
    {
      try
      {
        logApi.error_message = logApi.error_message.Replace( "'", "''" );

        IList<string> param = new List<string>()
        {
          logApi.request_id.Length > 200 ? logApi.request_id.Substring(0, 200) : logApi.request_id,
          logApi.url.Length > 500 ? logApi.url.Substring(0, 500) : logApi.url,
          logApi.method_name.Length > 200 ? logApi.method_name.Substring(0, 200) : logApi.method_name,
          logApi.param_input.Length > 2000 ? logApi.param_input.Substring(0, 2000) : logApi.param_input,
          logApi.response_status.ToString(),
          logApi.param_output.Length > 2000 ? logApi.param_output.Substring(0, 2000) : logApi.param_output,
          logApi.error_message.Length > 2000 ? logApi.error_message.Substring(0, 2000) : logApi.error_message,
          logApi.usr_crt.Length > 100 ? logApi.usr_crt.Substring(0, 100) : logApi.usr_crt
        };

        QueryRequestParam reqParam = new QueryRequestParam( ProcessType.Insert, _saveApiLog, param, RequestId, true );
        IRequestResult reqResult = QueryOperatorManager.ExecuteQuery( reqParam );
      }
      catch( Exception ex )
      {
        Logger.LogError( "error when save interface api log : {0}", ex.Message );
      }
    }

    [MethodImpl( MethodImplOptions.NoInlining )]
    protected string GetCurrentMethod()
    {
      var st = new StackTrace();
      var sf = st.GetFrame( 1 );
      return sf.GetMethod().Name;
    }

    protected LogApi CreateLogApiObj( string methodName, string paramInput )
    {
      return new LogApi()
      {
        url = _localIpAddress,
        method_name = methodName,
        param_input = paramInput
      };
    }

    protected CheckParam ValidateParamInput( string param, string errorMessage )
    {
      if( param.Equals( string.Empty ) )
        return new CheckParam()
        {
          CheckResult = false,
          Message = errorMessage
        };

      return new CheckParam()
      {
        CheckResult = true,
        Message = string.Empty
      };
    }

    private string GetLocalIPv4()
    {
      foreach( NetworkInterface item in NetworkInterface.GetAllNetworkInterfaces() )
        foreach( UnicastIPAddressInformation ip in item.GetIPProperties().UnicastAddresses )
          if( ip.Address.AddressFamily == AddressFamily.InterNetwork )
            return ip.Address.ToString();

      return "localhost";
    }

    private string GetUsernameFromHeader( HttpContext context )
    {
      if( context.Request.Headers.ContainsKey( "Username" ) )
        return context.Request.Headers[ "Username" ];

      return USER_SYSTEM;
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

    private CheckParam PreExecCheck( Func<CheckParam>[] preCheckFuncs )
    {
      if( preCheckFuncs != null && preCheckFuncs.Length > 0 )
        foreach( Func<CheckParam> func in preCheckFuncs )
        {
          CheckParam checkParam = func();

          if( !checkParam.CheckResult )
            return checkParam;
        }

      return new CheckParam()
      {
        CheckResult = true,
        Message = string.Empty
      };
    }

    private CheckParam PostExecCheck<TModel>( IList<TModel> models, bool isSingleRow, Func<TModel, CheckParam>[] postCheckFuncs ) where TModel: class
    {
      if( postCheckFuncs != null && postCheckFuncs.Length > 0 )
        foreach( Func<TModel, CheckParam> func in postCheckFuncs )
        {
          if( isSingleRow )
          {
            CheckParam checkParam = func( models[ 0 ] );

            if( !checkParam.CheckResult )
              return checkParam;
          }
          else
          {
            foreach( TModel model in models )
            {
              CheckParam checkParam = func( model );

              if( !checkParam.CheckResult )
                return checkParam;
            }
          }
        }

      return new CheckParam()
      {
        CheckResult = true,
        Message = string.Empty
      };
    }

    private QueryResult SetResponseForSuceedRequest( LogApi logApi, string paramOutput, QueryResult result )
    {
      logApi.param_output = paramOutput;
      SaveLogApi( logApi );
      Logger.LogInformation( "request succeed! response={0}", logApi.param_output );
      return result;
    }

    private QueryResult SetResponseForFailedRequest(LogApi logApi, int responseStatus, string errorMessage, QueryResult result = null )
    {
      if( result != null )
      {
        result.Succeed = false;
        result.ErrorMessage = errorMessage;
        result.Result = null;
      }
      else
        result = new QueryResult( logApi.request_id, logApi.method_name, false, logApi.error_message ); ;

      logApi.response_status = responseStatus;
      logApi.error_message = errorMessage;
      logApi.param_output = JsonConvert.SerializeObject( result );
      SaveLogApi( logApi );
      Logger.LogWarning( "request failed: {0}", logApi.error_message );

      return result;
    }
  }
}
