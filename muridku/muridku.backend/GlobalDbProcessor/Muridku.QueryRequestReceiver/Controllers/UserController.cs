﻿using Common;
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

      QueryResult reqResult = ExecuteRequest<User>( logApi, new List<string>() { param.email }, ConstRequestType.GET, QueryListKeyMap.GET_USER_BY_EMAIL,
        isSingleRow: true, preCheckFuncs: preCheckFuncs );

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
        ConstRequestType.POST, QueryListKeyMap.REGISTER_MURIDKU_USER, isSingleRow: true );
    }

    [HttpPut( QueryListKeyMap.ACTIVATE_USER )]
    public QueryResult ActivateUser( string email )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "email={0}", email ) );

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputString( new Tuple<string, string, int>( "email", email, email.Length ) )
      };

      QueryResult userResult = ExecuteRequest<User>( logApi, new List<string>() { email }, ConstRequestType.GET, QueryListKeyMap.GET_USER_BY_EMAIL,
        isSingleRow: true, preCheckFuncs: preCheckFuncs );

      if( !userResult.Succeed )
        return userResult;

      return ExecuteRequest<User>( logApi, new List<string>() { email }, ConstRequestType.PUT, QueryListKeyMap.ACTIVATE_USER,
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

      QueryResult reqResult = ExecuteRequest( logApi, new List<string>() { email }, ConstRequestType.GET, QueryListKeyMap.GET_ACTIVE_USER_BY_EMAIL,
        isSingleRow: true, preCheckFuncs: preCheckFuncs, postCheckFuncs: postCheckFuncs );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<User>( reqResult, reqResult.Succeed );

      User user = GetModelFromQueryResult<User>( reqResult );

      if( user.is_logged_in == 1 )
      {
        reqResult.RequestCode = QueryListKeyMap.LOGIN;
        return GetResponseBlankSingleModel<User>( reqResult, false, "user is still logged in" );
      }

      QueryResult loginResult = ExecuteRequest<User>( logApi, new List<string>() { email }, ConstRequestType.PUT, QueryListKeyMap.LOGIN, isSingleRow: true );

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

      QueryResult reqResult = ExecuteRequest<User>( logApi, new List<string>() { email }, ConstRequestType.GET, QueryListKeyMap.GET_ACTIVE_USER_BY_EMAIL,
        isSingleRow: true, preCheckFuncs: preCheckFuncs );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<User>( reqResult, reqResult.Succeed );

      User user = GetModelFromQueryResult<User>( reqResult );

      if( user.is_logged_in == 0 )
      {
        reqResult.RequestCode = QueryListKeyMap.LOGOUT;
        return GetResponseBlankSingleModel<User>( reqResult, false, "user already logged out" );
      }

      QueryResult logoutResult = ExecuteRequest<User>( logApi, new List<string>() { email }, ConstRequestType.PUT, QueryListKeyMap.LOGOUT, isSingleRow: true );

      if( !logoutResult.Succeed )
        return GetResponseBlankSingleModel<User>( logoutResult, logoutResult.Succeed );

      user.password = null;
      user.is_logged_in = 0;
      return GetResponseSingleModelCustom( logoutResult, user );
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

    private CheckParam ValidateFreeUser( User user, string errorMessage )
    {
      if( user.is_logged_in != 0 )
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
