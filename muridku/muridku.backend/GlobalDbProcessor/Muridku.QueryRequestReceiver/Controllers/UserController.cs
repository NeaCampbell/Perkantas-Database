using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models;
using Newtonsoft.Json;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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
      return EnqueueRequest( null, ConstRequestType.GET, _getAllUserAddr );
    }

    [HttpGet( _validateUserAddr )]
    public async Task<Response<User>> ValidateUser( string email, string password )
    {
      string invalidMsg = "invalid email or password";

      if( email.Replace( " ", "" ) != email )
        return new Response<User>( string.Empty, _validateUserAddr, false, invalidMsg );

      QueryResult reqResult = await ExecuteRequest( new List<string>() { email }, ConstRequestType.GET, _validateUserAddr );

      if( !reqResult.Succeed )
        return new Response<User>( reqResult.RequestId, reqResult.RequestCode, reqResult.Succeed, reqResult.ErrorMessage );

      Console.WriteLine( "    Query Result = {0}", reqResult.Result );

      if( string.IsNullOrEmpty( reqResult.Result ) )
        return new Response<User>( reqResult.RequestId, reqResult.RequestCode, false, invalidMsg );

      User user = JsonConvert.DeserializeObject<IList<User>>( reqResult.Result )[ 0 ];

      if( user.password != password )
        return new Response<User>( reqResult.RequestId, reqResult.RequestCode, false, invalidMsg );

      user.password = null;
      return new Response<User>( reqResult.RequestId, reqResult.RequestCode, reqResult.Succeed, reqResult.ErrorMessage, user );
    }
  }
}
