using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Params;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class MaterialController : QueryControllerBase
  {
    public MaterialController(ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager)
      : base(logger, queryOperatorManager)
    {
    }

    [HttpGet(QueryListKeyMap.GET_ALL_MATERIALS)]
    public Response<IList<Material>> GetAllMaterials()
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), "");

      QueryResult reqResult = ExecuteRequest<Faculty>(logApi, null, ConstRequestType.GET,
        QueryListKeyMap.GET_ALL_MATERIALS, QueryListKeyMap.GET_ALL_MATERIALS);

      if (!reqResult.Succeed)
        return GetResponseBlankMultiModels<Material>(reqResult, reqResult.Succeed);

      return GetResponseMultiModels<Material>(reqResult);
    }

    [HttpGet(QueryListKeyMap.GET_LAST_KTB_MATERIAL_BY_KTB_ID)]
    public Response<GetLastMaterial> GetLastKtbMaterialByKtbId(long ktbid)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Format("ktbid={0}", ktbid.ToString()));
      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputLong( new Tuple<string, long?>( "group id", ktbid ) )
      };

      QueryResult reqResult = ExecuteRequest<GetLastMaterial>(logApi, new List<string> { ktbid.ToString() }, ConstRequestType.GET,
        QueryListKeyMap.GET_LAST_KTB_MATERIAL_BY_KTB_ID, QueryListKeyMap.GET_LAST_KTB_MATERIAL_BY_KTB_ID, isSingleRow: true,
        preCheckFuncs: preCheckFuncs);

      if (!reqResult.Succeed)
        return GetResponseBlankSingleModel<GetLastMaterial>(reqResult, reqResult.Succeed);

      return GetResponseSingleModel<GetLastMaterial>(reqResult);
    }
  }
}
