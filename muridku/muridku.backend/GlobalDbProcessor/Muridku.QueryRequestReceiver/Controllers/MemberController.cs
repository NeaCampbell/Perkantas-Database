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
  public class MemberController : QueryControllerBase
  {
    private const string _getMemberById = "getmemberbyid";
    private const string _getMembersByListId = "getmembersbylistid";

    public MemberController( ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager )
      : base( logger, queryOperatorManager )
    {
    }

    [HttpGet( _getMemberById )]
    public Response<Member> GetMemberById( int memberid )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "memberid={0}", memberid.ToString() ) );
      QueryResult reqResult = ExecuteRequest<Member>( logApi, new List<string>() { memberid.ToString() }, ConstRequestType.GET,
        _getMemberById, true );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<Member>( reqResult, reqResult.Succeed );

      return GetResponseSingleModel<Member>( reqResult );
    }

    [HttpGet( _getMembersByListId )]
    public Response<IList<Member>> GetMembersByListId( [FromQuery] int[] listid )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Empty );
      string stringId = string.Empty;

      foreach( int id in listid )
      {
        if( stringId.Equals( string.Empty ) )
        {
          stringId = string.Format( "{0}", id.ToString() );
          logApi.param_input = string.Format( "listid={0}", id.ToString() );
        }
        else
        {
          stringId += string.Format( ",{0}", id.ToString() );
          logApi.param_input += string.Format( "&listid={0}", id.ToString() );
        }
      }

      Func<CheckParam>[] preCheckFuncs = new Func<CheckParam>[ 1 ];

      preCheckFuncs[ 0 ] = ( () => ValidateParamInput( stringId, "parameter is empty" ) );

      IList<string> paramQuery = new List<string>() { string.Format( "({0})", stringId ) };
      QueryResult reqResult = ExecuteRequest<Member>( logApi, paramQuery, ConstRequestType.GET, _getMembersByListId, preCheckFuncs: preCheckFuncs );

      if( !reqResult.Succeed )
        return GetResponseBlankMultiModels<Member>( reqResult, reqResult.Succeed );

      return GetResponseMultiModels<Member>( reqResult );
    }
  }
}
