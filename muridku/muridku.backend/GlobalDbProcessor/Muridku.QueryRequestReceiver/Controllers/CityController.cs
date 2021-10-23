using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Params;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class CityController : QueryControllerBase
  {
    public CityController(ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager)
      : base(logger, queryOperatorManager)
    {
    }

    [HttpGet(QueryListKeyMap.GET_ALL_CITY)]
    public Response<IList<City>> GetAllCity()
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Empty);
      QueryResult reqResult = ExecuteRequest<Faculty>(logApi, null, ConstRequestType.GET,
        QueryListKeyMap.GET_ALL_CITY, QueryListKeyMap.GET_ALL_CITY);

      if (!reqResult.Succeed)
        return GetResponseBlankMultiModels<City>(reqResult, reqResult.Succeed);

      return GetResponseMultiModels<City>(reqResult);
    }
  }
}
