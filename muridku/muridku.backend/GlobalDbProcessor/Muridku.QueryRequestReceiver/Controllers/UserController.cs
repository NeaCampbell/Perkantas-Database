using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Params;
using Newtonsoft.Json;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;
using System.Linq;

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
      return EnqueueRequest( logApi, null, ConstRequestType.GET, QueryListKeyMap.GET_ALL_USER, QueryListKeyMap.GET_ALL_USER );
    }

    [HttpPost( QueryListKeyMap.REGISTER_MURIDKU_USER )]
    public QueryResult RegisterMuridkuUser( [FromBody] UserRegistration param )
    {
      string paramInput = JsonConvert.SerializeObject( param );
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), paramInput );
      string invalidMsg = "invalid email or password";
      string encryptedPassword = CipherCentre.EncryptMD5( param.password ?? string.Empty,
                                                          QueryOperatorManager.EncryptMD5HashFormat,
                                                          QueryOperatorManager.EncryptMD5HashCultureInfo );

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputString( new Tuple<string, string, int>( "fullname", param.fullname, 100 ),
                                        new Tuple<string, string, int>( "email", param.email, 100 ),
                                        new Tuple<string, string, int>( "password", param.password, param.password.Length ),
                                        new Tuple<string, string, int>( "password", encryptedPassword, 100 ) ),
        () => ValidateEmail( param.email, invalidMsg )
      };

      QueryResult reqResult = ExecuteRequest<User>( logApi, new List<string>() { param.email }, ConstRequestType.GET, QueryListKeyMap.REGISTER_MURIDKU_USER,
        QueryListKeyMap.GET_USER_BY_EMAIL, isSingleRow: true, preCheckFuncs: preCheckFuncs );

      if( !reqResult.Succeed && reqResult.ErrorMessage != CommonMessage.DATA_NOT_FOUND )
        return reqResult;

      if( reqResult.Succeed )
        return new QueryResult()
        {
          RequestId = reqResult.RequestId,
          RequestCode = reqResult.RequestCode,
          Succeed = false,
          ErrorMessage = "user already exists",
          Result = reqResult.Result
        };

      return ExecuteRequest<User>( logApi, new List<string>() { param.fullname, param.email, encryptedPassword, GetUsernameFromHeader( HttpContext ) },
        ConstRequestType.POST, QueryListKeyMap.REGISTER_MURIDKU_USER, QueryListKeyMap.REGISTER_MURIDKU_USER, isSingleRow: true );
    }

    [HttpPut( QueryListKeyMap.ACTIVATE_USER )]
    public QueryResult ActivateUser( string email )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "email={0}", email ) );

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputString( new Tuple<string, string, int>( "email", email, email.Length ) )
      };

      QueryResult userResult = ExecuteRequest<User>( logApi, new List<string>() { email }, ConstRequestType.GET, QueryListKeyMap.ACTIVATE_USER,
        QueryListKeyMap.GET_USER_BY_EMAIL, isSingleRow: true, preCheckFuncs: preCheckFuncs );

      if( !userResult.Succeed )
        return userResult;

      return ExecuteRequest<User>( logApi, new List<string>() { email }, ConstRequestType.PUT, QueryListKeyMap.ACTIVATE_USER, QueryListKeyMap.ACTIVATE_USER,
        isSingleRow: true );
    }

    [HttpPut( QueryListKeyMap.LOGIN )]
    public Response<User> Login( string email, string password )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "email={0}&password={1}", email, password ) );
      string invalidMsg = "invalid email or password";

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputString( new Tuple<string, string, int>( "email", email, email.Length ),
                                        new Tuple<string, string, int>( "password", password, string.IsNullOrEmpty( password ) ? 0 : password.Length ) ),
        () => ValidateEmail( email, invalidMsg )
      };

      IList<Func<User, CheckParam>> postCheckFuncs = new List<Func<User, CheckParam>>
      {
        ( User user ) => ValidatePassword( user, password, invalidMsg )
      };

      QueryResult reqResult = ExecuteRequest( logApi, new List<string>() { email }, ConstRequestType.GET, QueryListKeyMap.LOGIN,
        QueryListKeyMap.GET_ACTIVE_USER_BY_EMAIL, isSingleRow: true, preCheckFuncs: preCheckFuncs, postCheckFuncs: postCheckFuncs );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<User>( reqResult, reqResult.Succeed );

      User user = GetModelFromQueryResult<User>( reqResult );

      if( user.is_logged_in == 1 )
        return GetResponseBlankSingleModel<User>( reqResult, false, "user is still logged in", false );

      QueryResult loginResult = ExecuteRequest<User>( logApi, new List<string>() { email }, ConstRequestType.PUT, QueryListKeyMap.LOGIN,
        QueryListKeyMap.LOGIN, isSingleRow: true );

      if( !loginResult.Succeed )
        return GetResponseBlankSingleModel<User>( loginResult, loginResult.Succeed );

      user.password = null;
      user.is_logged_in = 1;
      return GetResponseSingleModelCustom( loginResult, user );
    }

    [HttpPut( QueryListKeyMap.LOGOUT )]
    public Response<User> Logout( string email )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "email={0}", email ) );
      string invalidMsg = "invalid email";

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputString( new Tuple<string, string, int>( "email", email, email.Length ) ),
        () => ValidateEmail( email, invalidMsg )
      };

      QueryResult reqResult = ExecuteRequest<User>( logApi, new List<string>() { email }, ConstRequestType.GET, QueryListKeyMap.LOGOUT,
        QueryListKeyMap.GET_ACTIVE_USER_BY_EMAIL, isSingleRow: true, preCheckFuncs: preCheckFuncs );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<User>( reqResult, reqResult.Succeed );

      User user = GetModelFromQueryResult<User>( reqResult );

      if( user.is_logged_in == 0 )
        return GetResponseBlankSingleModel<User>( reqResult, false, "user already logged out", false );

      QueryResult logoutResult = ExecuteRequest<User>( logApi, new List<string>() { email }, ConstRequestType.PUT, QueryListKeyMap.LOGOUT,
        QueryListKeyMap.LOGOUT, isSingleRow: true );
      logoutResult.RequestCode = QueryListKeyMap.LOGOUT;

      if( !logoutResult.Succeed )
        return GetResponseBlankSingleModel<User>( logoutResult, logoutResult.Succeed );

      user.password = null;
      user.is_logged_in = 0;
      return GetResponseSingleModelCustom( logoutResult, user );
    }

    [HttpGet( QueryListKeyMap.CHECK_USER_LOGIN_STATUS )]
    public Response<User> CheckUserLoginStatus( string email )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "email={0}", email ) );
      string invalidMsg = "invalid email";

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputString( new Tuple<string, string, int>( "email", email, email.Length ) ),
        () => ValidateEmail( email, invalidMsg )
      };

      QueryResult reqResult = ExecuteRequest<User>( logApi, new List<string>() { email }, ConstRequestType.GET, QueryListKeyMap.CHECK_USER_LOGIN_STATUS,
        QueryListKeyMap.GET_ACTIVE_USER_BY_EMAIL, isSingleRow: true, preCheckFuncs: preCheckFuncs );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<User>( reqResult, reqResult.Succeed );

      User user = GetModelFromQueryResult<User>( reqResult );

      if( user.is_logged_in == 0 )
        return GetResponseBlankSingleModel<User>( reqResult, false, "user already logged out", false );

      user.password = null;
      return GetResponseSingleModelCustom( reqResult, user );
    }

    [HttpGet(QueryListKeyMap.VALIDATE_NEW_EMAIL)]
    public Response<User> ValidateNewEmail(string email)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("email={0}", email));
      QueryResult reqResult = ExecuteRequest<User>(logApi, new List<string>() { email }, ConstRequestType.GET, QueryListKeyMap.VALIDATE_NEW_EMAIL,
        QueryListKeyMap.GET_USER_BY_EMAIL, false);

      if (!reqResult.Succeed && reqResult.ErrorMessage != CommonMessage.DATA_NOT_FOUND)
        return GetResponseBlankSingleModel<User>(reqResult, reqResult.Succeed);

      if (!reqResult.Succeed && reqResult.ErrorMessage == CommonMessage.DATA_NOT_FOUND)
        return GetResponseBlankSingleModel<User>(reqResult, true, "");

      return GetResponseBlankSingleModel<User>(reqResult, false, "user already exists");
    }

    [HttpGet(QueryListKeyMap.GET_INACTIVE_USER_BY_MEMBER_ID)]
    public Response<User> GetInactiveUserByMemberId(int memberid)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("memberid={0}", memberid));
      QueryResult reqResult = ExecuteRequest<User>(logApi, new List<string>() { memberid.ToString() }, ConstRequestType.GET, QueryListKeyMap.GET_INACTIVE_USER_BY_MEMBER_ID,
        QueryListKeyMap.GET_USERS_BY_MEMBER_ID);

      if (!reqResult.Succeed && reqResult.ErrorMessage != CommonMessage.DATA_NOT_FOUND)
        return GetResponseBlankSingleModel<User>(reqResult, reqResult.Succeed);

      if (!reqResult.Succeed && reqResult.ErrorMessage == CommonMessage.DATA_NOT_FOUND)
        return GetResponseBlankSingleModel<User>(reqResult, true, "");

      IList<User> users = GetModelListFromQueryResult<User>(reqResult);

      if (users.Any(user => user.is_active == 1))
        return GetResponseBlankSingleModel<User>(reqResult, false, "member already have active user", false);

      User user = users[0];
      user.password = null;
      return GetResponseSingleModelCustom(reqResult, user);
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
      if( user.password != CipherCentre.EncryptMD5( password, QueryOperatorManager.EncryptMD5HashFormat, QueryOperatorManager.EncryptMD5HashCultureInfo ) )
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
