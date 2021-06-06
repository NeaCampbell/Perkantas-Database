using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Params;
using QueryManager;
using QueryOperator.QueryExecutor;
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
  }
}
