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
    public Response<IList<Member>> GetAllInactiveKtbMembers(int pktbid)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("pktbid={0}", pktbid));
      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputLong( new Tuple<string, long?>( "group leader", pktbid ) )
      };
      QueryResult reqResult = ExecuteRequest<Member>(logApi, new List<string>() { pktbid.ToString() }, ConstRequestType.GET,
        QueryListKeyMap.GET_ALL_INACTIVE_KTB_MEMBERS, QueryListKeyMap.GET_ALL_INACTIVE_KTB_MEMBERS,
        preCheckFuncs: preCheckFuncs);

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

    [HttpGet(QueryListKeyMap.GET_KTB_HISTORY_BY_KTB_ID)]
    public Response<CombinedKtbKtbHistory> GetKtbHistoryByKtbId([FromQuery] long ktbid)
    {
      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputLong( new Tuple<string, long?>( "group id", ktbid ) ),
      };

      IList<string> paramQuery = new List<string>()
      {
        ktbid.ToString()
      };

      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("ktbid={0}", ktbid.ToString()));
      QueryResult result = ExecuteRequest<Member>(logApi, paramQuery, ConstRequestType.GET,
        QueryListKeyMap.GET_KTB_HISTORY_BY_KTB_ID, QueryListKeyMap.GET_KTB_BY_KTB_ID, isSingleRow: true,
        preCheckFuncs: preCheckFuncs);

      if (!result.Succeed)
        return GetResponseBlankSingleModel<CombinedKtbKtbHistory>(result, result.Succeed);

      Ktb ktb = GetModelFromQueryResult<Ktb>(result);
      GlobalHelperController helper = new GlobalHelperController(Logger, QueryOperatorManager, HttpContext);
      return GetResponseSingleModelCustom(result, helper.GetKtbHistoryByKtbId(ktb, logApi, QueryListKeyMap.GET_KTB_HISTORY_BY_KTB_ID));
    }

    [HttpPost(QueryListKeyMap.SAVE_SINGLE_KTB_HISTORY)]
    public QueryResult SaveSingleKtbHistory([FromBody] NewKtbHistory param)
    {
      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateDetailHistoryMember( param.members ),
        () => ValidateParamInputLong( new Tuple<string, long?>( "group id", param.ktb_id ) ),
        () => ValidateParamInputString( new Tuple<string, string, int>( "meet dt", param.meet_dt.ToString(CommonFormat.YYYY_MM_DD), 100 ) ),
        () => ValidateParamInputLong( new Tuple<string, long?>( "material id", param.material_id ) ),
        () => ValidateParamInputString( new Tuple<string, string, int>( "material name", param.material_name, 100 ) ),
        () => ValidateParamInputLong( new Tuple<string, long?>( "chapter", param.material_chapter ) )
      };

      IList<string> paramQuery = new List<string>()
      {
        param.ktb_id.ToString(),
        param.meet_dt.ToString(CommonFormat.YYYY_MM_DD),
        param.material_id.ToString(),
        param.material_name,
        param.material_chapter.ToString(),
        GetUsernameFromHeader( HttpContext )
      };

      string paramStr = JsonConvert.SerializeObject(param);

      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), paramStr);
      QueryResult result = ExecuteRequest<KtbHistory>(logApi, paramQuery, ConstRequestType.GET,
        QueryListKeyMap.SAVE_SINGLE_KTB_HISTORY, QueryListKeyMap.SAVE_SINGLE_KTB_HISTORY, isSingleRow: true,
        preCheckFuncs: preCheckFuncs);

      if (!result.Succeed)
        return result;

      KtbHistory hist = GetModelFromQueryResult<KtbHistory>(result);

      foreach(NewKtbHistoryMember member in param.members)
      {
        paramQuery = new List<string>()
        {
          hist.id.ToString(),
          member.member_id.ToString(),
          member.is_attending.ToString(),
          GetUsernameFromHeader( HttpContext )
        };

        logApi = CreateLogApiObj(GetCurrentMethod(), paramStr);
        QueryResult resultDetail = ExecuteRequest<Member>(logApi, paramQuery, ConstRequestType.POST,
          QueryListKeyMap.SAVE_SINGLE_KTB_HISTORY, QueryListKeyMap.SAVE_SINGLE_KTB_HISTORY_MEMBER, isSingleRow: true);

        if (!resultDetail.Succeed)
          return resultDetail;
      }

      return new QueryResult(logApi.request_id, QueryListKeyMap.SAVE_SINGLE_KTB_HISTORY, true, "");
    }

    private CheckParam ValidateDetailHistoryMember(IList<NewKtbHistoryMember> param)
    {
      if (param == null || param.Count == 0)
        return new CheckParam()
        {
          CheckResult = false,
          Message = "members cannot be empty."
        };

      foreach(NewKtbHistoryMember member in param)
        if (member.member_id == 0)
          return new CheckParam()
          {
            CheckResult = false,
            Message = "member id is invalid."
          };

      return new CheckParam()
      {
        CheckResult = true,
        Message = string.Empty
      };
    }
  }
}
