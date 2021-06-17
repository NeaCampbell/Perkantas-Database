using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Dbs.Combined;
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
  [Route("[controller]")]
  public class UserController : QueryControllerBase
  {
    private readonly IDictionary<int, string> _userActiveValues;

    public UserController( ILogger<UserController> logger
        , IQueryOperatorManager<DbServiceType> queryOperatorManager ) :
        base( logger, queryOperatorManager )
    {
      _userActiveValues = new Dictionary<int, string>();
      _userActiveValues.Add(0, "INACTIVE");
      _userActiveValues.Add(1, "ACTIVE");
      _userActiveValues.Add(2, "INACTIVE-MEMBER");
      _userActiveValues.Add(3, "REJECT");
    }

    protected override void OnQueuedQueryExecutedHandler( object sender, QueryResult result )
    {
      if( RequestId == result.RequestId )
      {
        base.OnQueuedQueryExecutedHandler( sender, result );
        
        switch( result.RequestCode )
        {
          case QueryListKeyMap.GET_ALL_USER:
            //Logger.LogInformation( "    Query Result {0} = {1}", result.RequestId, result.Result );
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
        () => ValidateParamInputLong( new Tuple<string, long?>( "city id", param.city_id ) ),
        () => ValidateEmail( param.email, invalidMsg )
      };

      return ExecuteRequest<User>(logApi, new List<string>() { param.fullname, param.city_id.ToString(), param.email, param.address, encryptedPassword, GetUsernameFromHeader(HttpContext) },
        ConstRequestType.POST, QueryListKeyMap.REGISTER_MURIDKU_USER, QueryListKeyMap.REGISTER_MURIDKU_USER, isSingleRow: true,
        preCheckFuncs: preCheckFuncs);
    }

    [HttpGet(QueryListKeyMap.GET_INACTIVE_USERS)]
    public Response<IList<CombinedUserMemberName>> GetInactiveUsers()
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), "");
      QueryResult result = ExecuteRequest<User>(logApi, null, ConstRequestType.GET,
        QueryListKeyMap.GET_INACTIVE_USERS, QueryListKeyMap.GET_INACTIVE_USERS);

      if(!result.Succeed)
        return GetResponseBlankMultiModels<CombinedUserMemberName>(result, result.Succeed);

      return GetResponseMultiModels<CombinedUserMemberName>(result);
    }

    [HttpPut(QueryListKeyMap.ACTIVATE_USER)]
    public QueryResult ActivateUser([FromBody] ActivateUser[] param)
    {
      string paramStr = JsonConvert.SerializeObject(param);
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), paramStr);

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateIsActive(param, "invalid is active parameter")
      };

      QueryResult returnResult = new QueryResult(logApi.request_id, QueryListKeyMap.ACTIVATE_USER, true, string.Empty);

      foreach (ActivateUser user in param)
      {
        QueryResult result = ExecuteRequest<User>(logApi, new List<string>() { user.email, user.is_active.ToString() }, ConstRequestType.PUT,
          QueryListKeyMap.ACTIVATE_USER, QueryListKeyMap.ACTIVATE_USER,
          isSingleRow: true, preCheckFuncs: preCheckFuncs);

        if (!result.Succeed)
          return result;
      }

      return returnResult;
    }

    [HttpPut(QueryListKeyMap.LOGIN)]
    public Response<User> Login(string email, string password, string deviceid, int isstayloggedin)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("email={0}&password={1}&deviceid={2}&isstayloggedin={3}",
        email, password, deviceid, isstayloggedin.ToString()));
      string invalidMsg = "invalid email or password";

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputString( new Tuple<string, string, int>( "email", email, email.Length ),
                                        new Tuple<string, string, int>( "password", password, string.IsNullOrEmpty( password ) ? 0 : password.Length ),
                                        new Tuple<string, string, int>( "device id", deviceid, string.IsNullOrEmpty( deviceid ) ? 0 : deviceid.Length )),
        () => ValidateEmail( email, invalidMsg ),
        () => ValidateStayLoggedInValue( isstayloggedin )
      };

      IList<Func<User, CheckParam>> postCheckFuncs = new List<Func<User, CheckParam>>
      {
        ( User user ) => ValidatePassword( user, password, invalidMsg )
      };

      QueryResult reqResult = ExecuteRequest(logApi, new List<string>() { email, deviceid, isstayloggedin.ToString() }, ConstRequestType.GET,
        QueryListKeyMap.LOGIN, QueryListKeyMap.LOGIN, isSingleRow: true, preCheckFuncs: preCheckFuncs,
        postCheckFuncs: postCheckFuncs);

      if (!reqResult.Succeed)
        return GetResponseBlankSingleModel<User>(reqResult, reqResult.Succeed);

      User user = GetModelFromQueryResult<User>(reqResult);
      user.password = null;
      return GetResponseSingleModelCustom(reqResult, user);
    }

    [HttpPut(QueryListKeyMap.LOGOUT)]
    public Response<User> Logout(string email, string deviceid)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("email={0}&deviceid={1}", email, deviceid));
      string invalidMsg = "invalid email";

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputString( new Tuple<string, string, int>( "email", email, email.Length ),
                                        new Tuple<string, string, int>( "device id", deviceid, deviceid.Length ) ),
        () => ValidateEmail( email, invalidMsg )
      };

      QueryResult reqResult = ExecuteRequest<User>(logApi, new List<string>() { email, deviceid }, ConstRequestType.GET,
        QueryListKeyMap.LOGOUT, QueryListKeyMap.LOGOUT, isSingleRow: true, preCheckFuncs: preCheckFuncs);

      if (!reqResult.Succeed)
        return GetResponseBlankSingleModel<User>(reqResult, reqResult.Succeed);

      User user = GetModelFromQueryResult<User>(reqResult);
      user.password = null;
      return GetResponseSingleModelCustom(reqResult, user);
    }

    [HttpGet(QueryListKeyMap.CHECK_USER_LOGIN_STATUS)]
    public Response<User> CheckUserLoginStatus(string email, string deviceid)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("email={0}&deviceid={1}", email, deviceid));
      string invalidMsg = "invalid email";

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputString( new Tuple<string, string, int>( "email", email, email.Length ),
                                        new Tuple<string, string, int>( "device id", deviceid, deviceid.Length ) ),
        () => ValidateEmail( email, invalidMsg )
      };

      QueryResult reqResult = ExecuteRequest<User>(logApi, new List<string>() { email, deviceid }, ConstRequestType.GET,
        QueryListKeyMap.CHECK_USER_LOGIN_STATUS, QueryListKeyMap.CHECK_USER_LOGIN_STATUS, isSingleRow: true, preCheckFuncs: preCheckFuncs);

      if (!reqResult.Succeed)
        return GetResponseBlankSingleModel<User>(reqResult, reqResult.Succeed);

      User user = GetModelFromQueryResult<User>(reqResult);
      user.password = null;
      return GetResponseSingleModelCustom(reqResult, user);
    }

    [HttpGet(QueryListKeyMap.CHECK_USER_ACTIVE_ON_DEVICE)]
    public Response<User> CheckUserActiveOnDevice(string deviceid)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("deviceid={0}", deviceid));

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputString( new Tuple<string, string, int>( "device id", deviceid, deviceid.Length ) )
      };

      QueryResult reqResult = ExecuteRequest<User>(logApi, new List<string>() { deviceid }, ConstRequestType.GET,
        QueryListKeyMap.CHECK_USER_ACTIVE_ON_DEVICE, QueryListKeyMap.CHECK_USER_ACTIVE_ON_DEVICE, isSingleRow: true, preCheckFuncs: preCheckFuncs);

      if (!reqResult.Succeed)
        return GetResponseBlankSingleModel<User>(reqResult, reqResult.Succeed);

      User user = GetModelFromQueryResult<User>(reqResult);
      user.password = null;
      return GetResponseSingleModelCustom(reqResult, user);
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

    private CheckParam ValidateIsActive(ActivateUser[] param, string errorMessage)
    {
      foreach(ActivateUser user in param)
        if (!_userActiveValues.ContainsKey(user.is_active))
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

    private CheckParam ValidateStayLoggedInValue(int isstayloggedin)
    {
      if (isstayloggedin > 1 || isstayloggedin < 0)
        return new CheckParam()
        {
          CheckResult = false,
          Message = "invalid stay logged in param"
        };

      return new CheckParam()
      {
        CheckResult = true
      };
    }
  }
}
