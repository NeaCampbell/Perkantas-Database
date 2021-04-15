using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Controllers
{
  [ApiController]
  [Route( "[controller]" )]
  public class MemberController : QueryControllerBase
  {
    private const string _getMemberById = "getmemberbyid";
    private const string _getMemberByListId = "getmemberbylistid";

    public MemberController( ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager )
      : base( logger, queryOperatorManager )
    {
    }

    [HttpGet( _getMemberById )]
    public Response<Member> GetMemberById( int memberid )
    {
      QueryResult reqResult = ExecuteRequest( new List<string>() { memberid.ToString() }, ConstRequestType.GET, _getMemberById );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<Member>( reqResult, reqResult.Succeed );

      return GetResponseSingleModel<Member>( reqResult );
    }

    [HttpPost( _getMemberByListId )]
    public Response<IList<Member>> GetMembersByListId( [FromBody] IList<int> listid )
    {
      IList<string> paramQuery = new List<string>();

      foreach( int id in listid )
        paramQuery.Add( id.ToString() );

      QueryResult reqResult = ExecuteRequest( paramQuery, ConstRequestType.GET, _getMemberByListId );

      if( !reqResult.Succeed )
        return GetResponseBlankMultiModels<Member>( reqResult, reqResult.Succeed );

      return GetResponseMultiModels<Member>( reqResult );
    }
  }
}
