using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Params;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Controllers
{
  [ApiController]
  [Route( "[controller]" )]
  public class UserController : QueryControllerBase
  {
    public UserController( ILogger<UserController> logger
        , IQueryOperatorManager<DbServiceType> queryOperatorManager ) :
        base( logger, queryOperatorManager )
    {
    }

    protected override void OnQueuedQueryExecutedHandler( object sender, QueryResult result )
    {
      if( RequestId == result.RequestId )
      {
        base.OnQueuedQueryExecutedHandler( sender, result );
        Logger.LogInformation( "    Request id {0}, error msg = {1}", result.RequestId, result.ErrorMessage );

        switch( result.RequestCode )
        {
          case QueryListKeyMap.GET_ALL_USER:
            Logger.LogInformation( "    Query Result {0} = {1}", result.RequestId, result.Result );
            break;
          default:
            break;
        }
      }
    }

    [HttpGet( QueryListKeyMap.GET_ALL_USER )]
    public QueryResult GetAllUser()
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Empty );
      return EnqueueRequest( logApi, null, ConstRequestType.GET, QueryListKeyMap.GET_ALL_USER );
    }

    [HttpGet( QueryListKeyMap.VALIDATE_USER )]
    public Response<User> ValidateUser( string email, string password )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "email={0}&password={1}", email, password ) );
      string invalidMsg = "invalid email or password";

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInput( null, email, password ),
        () => ValidateEmail( email, invalidMsg )
      };

      IList<Func<User, CheckParam>> postCheckFuncs = new List<Func<User, CheckParam>>
      {
        ( User user ) => ValidatePassword( user, password, invalidMsg )
      };

      QueryResult reqResult = ExecuteRequest( logApi, new List<string>() { email }, ConstRequestType.GET, QueryListKeyMap.VALIDATE_USER,
        isSingleRow: true, preCheckFuncs: preCheckFuncs, postCheckFuncs: postCheckFuncs );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<User>( reqResult, reqResult.Succeed );

      User user = GetModelFromQueryResult<User>( reqResult );
      user.password = null;
      return GetResponseSingleModelCustom( reqResult, user );
    }

    private CheckParam ValidateEmail( string email, string errorMessage )
    {
      if( email.Replace( " ", "" ) != email )
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

    private CheckParam ValidatePassword( User user, string password, string errorMessage )
    {
      if( user.password != password )
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
  }
}
