using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Dbs.Combined;
using Muridku.QueryRequestReceiver.Models.Params;
using QueryManager;
using QueryOperator.QueryExecutor;
using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Controllers
{
  [ApiController]
  [Route( "[controller]" )]
  public class KtbController : QueryControllerBase
  {
    public KtbController( ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager )
      : base( logger, queryOperatorManager )
    {
    }

    [HttpGet( QueryListKeyMap.GET_KTBS_BY_PKTB_ID )]
    public Response<IList<CombinedKtbMember>> GetKtbsByPktbId( int memberid )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "memberid={0}", memberid.ToString() ) );
      QueryResult reqResult = ExecuteRequest<Member>( logApi, new List<string>() { memberid.ToString() }, ConstRequestType.GET,
        QueryListKeyMap.GET_KTBS_BY_PKTB_ID, QueryListKeyMap.GET_KTBS_BY_PKTB_ID );

      if( !reqResult.Succeed )
        return GetResponseBlankMultiModels<CombinedKtbMember>( reqResult, reqResult.Succeed );

      IList<Ktb> ktbs = GetModelListFromQueryResult<Ktb>( reqResult );
      IList<CombinedKtbMember> result = new List<CombinedKtbMember>();
      GlobalHelperController helper = new GlobalHelperController( Logger, QueryOperatorManager, HttpContext );

      foreach( Ktb ktb in ktbs )
        result.Add( helper.GetAktbsByKtbId( ktb, logApi, QueryListKeyMap.GET_KTBS_BY_PKTB_ID ) );

      return GetResponseMultiModelsCustom( reqResult, result );
    }
  }
}
