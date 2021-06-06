using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Dbs.Combined;
using Muridku.QueryRequestReceiver.Models.Params;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
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
    public Response<IList<CombinedKtbMember>> GetKtbsByPktbId( long memberid )
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

    [HttpGet(QueryListKeyMap.GET_KTB_BY_KTB_ID)]
    public Response<CombinedKtbMember> GetKtbByKtbId(long id)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("id={0}", id.ToString()));
      QueryResult reqResult = ExecuteRequest<Member>(logApi, new List<string>() { id.ToString() }, ConstRequestType.GET,
        QueryListKeyMap.GET_KTB_BY_KTB_ID, QueryListKeyMap.GET_KTB_BY_KTB_ID, isSingleRow: true);

      if (!reqResult.Succeed)
        return GetResponseBlankSingleModel<CombinedKtbMember>(reqResult, reqResult.Succeed);

      Ktb ktb = GetModelFromQueryResult<Ktb>(reqResult);
      GlobalHelperController helper = new GlobalHelperController(Logger, QueryOperatorManager, HttpContext);
      return GetResponseSingleModelCustom(reqResult, helper.GetAktbsByKtbId(ktb, logApi, QueryListKeyMap.GET_KTB_BY_KTB_ID));
    }

    [HttpGet(QueryListKeyMap.GET_ALL_INACTIVE_KTB_MEMBERS)]
    public Response<IList<Member>> GetAllInactiveKtbMembers()
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), "");
      QueryResult reqResult = ExecuteRequest<Member>(logApi, null, ConstRequestType.GET,
        QueryListKeyMap.GET_ALL_INACTIVE_KTB_MEMBERS, QueryListKeyMap.GET_ALL_INACTIVE_KTB_MEMBERS);

      if (!reqResult.Succeed)
        return GetResponseBlankMultiModels<Member>(reqResult, reqResult.Succeed);

      return GetResponseMultiModels<Member>(reqResult);
    }

    [HttpPost(QueryListKeyMap.SAVE_SINGLE_KTB)]
    public Response<CombinedKtbMember> SaveSingleKtb([FromBody] NewKtb param)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("pktb_id={0}&name={1}", param.pktb_id.ToString(), param.name));
      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputLong( new Tuple<string, long?>( "group leader", param.pktb_id ) ),
        () => ValidateParamInputString( new Tuple<string, string, int>( "name", param.name, 100 ) )
      };

      IList<string> paramQuery = new List<string>()
      {
        param.pktb_id.ToString(),
        param.name,
        GetUsernameFromHeader( HttpContext )
      };

      QueryResult reqResult = ExecuteRequest<Member>(logApi, paramQuery, ConstRequestType.GET,
        QueryListKeyMap.SAVE_SINGLE_KTB, QueryListKeyMap.SAVE_SINGLE_KTB, isSingleRow: true,
        preCheckFuncs: preCheckFuncs);

      if (!reqResult.Succeed)
        return GetResponseBlankSingleModel<CombinedKtbMember>(reqResult, reqResult.Succeed);

      GlobalHelperController helper = new GlobalHelperController(Logger, QueryOperatorManager, HttpContext);
      return GetResponseSingleModelCustom(reqResult, helper.GetAktbsByKtbId(GetResponseSingleModel<Ktb>(reqResult).Result, logApi, QueryListKeyMap.SAVE_SINGLE_KTB));
    }

    [HttpPut(QueryListKeyMap.UPDATE_SINGLE_KTB)]
    public Response<Ktb> UpdateSingleKtb([FromBody] UpdateKtb param)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("ktb_id={0}&pktb_id={1}&name={2}", param.ktb_id.ToString(), param.pktb_id.ToString(), param.name));
      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputLong( new Tuple<string, long?>( "group id", param.ktb_id ) ),
        () => ValidateParamInputLong( new Tuple<string, long?>( "leader id", param.pktb_id ) ),
        () => ValidateParamInputString( new Tuple<string, string, int>( "name", param.name, 100 ) )
      };

      IList<string> paramQuery = new List<string>()
      {
        param.ktb_id.ToString(),
        param.pktb_id.ToString(),
        param.name,
        GetUsernameFromHeader( HttpContext )
      };

      QueryResult reqResult = ExecuteRequest<Member>(logApi, paramQuery, ConstRequestType.GET,
        QueryListKeyMap.UPDATE_SINGLE_KTB, QueryListKeyMap.UPDATE_SINGLE_KTB, isSingleRow: true,
        preCheckFuncs: preCheckFuncs);

      if (!reqResult.Succeed)
        return GetResponseBlankSingleModel<Ktb>(reqResult, reqResult.Succeed);

      return GetResponseSingleModel<Ktb>(reqResult);
    }

    [HttpPut(QueryListKeyMap.UPDATE_AKTB_STATUS_BY_LIST_ID)]
    public QueryResult UpdateAktbStatusByListId([FromBody] UpdateAktbStatus param)
    {
      string listIdStr = "(";
      string listIdContent = string.Empty;

      foreach (UpdateAktb aktb in param.list_id)
        listIdContent += (listIdContent == string.Empty ? "" : ",") + aktb.id.ToString();

      listIdStr += listIdContent + ")";

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputLong( new Tuple<string, long?>( "group id", param.ktb_id ) ),
        () => ValidateList(param.list_id, "invalid member id parameter")
      };

      IList<string> paramQuery = new List<string>()
      {
        param.ktb_id.ToString(),
        listIdStr,
        GetUsernameFromHeader( HttpContext )
      };

      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), listIdStr);
      return ExecuteRequest<Member>(logApi, paramQuery, ConstRequestType.PUT,
        QueryListKeyMap.UPDATE_AKTB_STATUS_BY_LIST_ID, QueryListKeyMap.UPDATE_AKTB_STATUS_BY_LIST_ID, isSingleRow: true,
        preCheckFuncs: preCheckFuncs);
    }

    [HttpDelete(QueryListKeyMap.DELETE_KTBS_BY_LIST_ID)]
    public QueryResult DeleteKtbsByListId([FromQuery] IList<long> listid)
    {
      string listIdStr = "(";
      string listIdContent = string.Empty;

      foreach (int id in listid)
        listIdContent += (listIdContent == string.Empty ? "" : ",") + id.ToString();

      listIdStr += listIdContent + ")";

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateList(listid, "invalid ktb id parameter")
      };

      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), listIdStr);
      return ExecuteRequest<Member>(logApi, new List<string>() { listIdStr }, ConstRequestType.DELETE,
        QueryListKeyMap.DELETE_KTBS_BY_LIST_ID, QueryListKeyMap.DELETE_KTBS_BY_LIST_ID, isSingleRow: true,
        preCheckFuncs: preCheckFuncs);
    }

    [HttpDelete(QueryListKeyMap.DELETE_KTB_MEMBER_BY_LIST_ID)]
    public QueryResult DeleteKtbMemberByListId([FromBody] UpdateAktbStatus param)
    {
      string listIdStr = "(";
      string listIdContent = string.Empty;

      foreach (UpdateAktb aktb in param.list_id)
        listIdContent += (listIdContent == string.Empty ? "" : ",") + aktb.id.ToString();

      listIdStr += listIdContent + ")";

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputLong( new Tuple<string, long?>( "group id", param.ktb_id ) ),
        () => ValidateList(param.list_id, "invalid member id parameter")
      };

      IList<string> paramQuery = new List<string>()
      {
        param.ktb_id.ToString(),
        listIdStr,
        GetUsernameFromHeader( HttpContext )
      };

      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), listIdStr);
      return ExecuteRequest<Member>(logApi, paramQuery, ConstRequestType.DELETE,
        QueryListKeyMap.DELETE_KTB_MEMBER_BY_LIST_ID, QueryListKeyMap.DELETE_KTB_MEMBER_BY_LIST_ID, isSingleRow: true,
        preCheckFuncs: preCheckFuncs);
    }
  }
}
