using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models;
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
    private const string _getAllUserAddr = "getalluser";
    private const string _validateUserAddr = "validateuser";

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
        Console.WriteLine( "    Request id {0}, error msg = {1}", result.RequestId, result.ErrorMessage );

        switch( result.RequestCode )
        {
          case _getAllUserAddr:
            Console.WriteLine( "    Query Result {0} = {1}", result.RequestId, result.Result );
            break;
          default:
            break;
        }
      }
    }

    [HttpGet( _getAllUserAddr )]
    public QueryResult GetAllUser()
    {
      LogApi logApi = CreateLogApiObj( "localhost", GetCurrentMethod(), string.Empty );
      return EnqueueRequest( logApi, null, ConstRequestType.GET, _getAllUserAddr );
    }

    [HttpGet( _validateUserAddr )]
    public Response<User> ValidateUser( string email, string password )
    {
      LogApi logApi = CreateLogApiObj( "localhost", GetCurrentMethod(), string.Format( "email={0}&password={1}", email, password ) );
      string invalidMsg = "invalid email or password";

      Func<CheckParam>[] preCheckFuncs = new Func<CheckParam>[ 1 ];
      preCheckFuncs[ 0 ] = ( () => ValidateEmail( email, invalidMsg ) );

      Func<User, CheckParam>[] postCheckFuncs = new Func<User, CheckParam>[ 1 ];
      postCheckFuncs[ 0 ] = ( ( User user ) => ValidatePassword( user, password, invalidMsg ) );

      QueryResult reqResult = ExecuteRequest( logApi, new List<string>() { email }, ConstRequestType.GET, _validateUserAddr,
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
