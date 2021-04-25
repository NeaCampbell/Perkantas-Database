using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Params;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Controllers
{
  [ApiController]
  [Route( "[controller]" )]
  public class InstitutionController : QueryControllerBase
  {
    public InstitutionController( ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager )
      : base( logger, queryOperatorManager )
    {
    }

    [HttpGet( QueryListKeyMap.GET_ALL_INSTITUTION )]
    public QueryResult GetAllInstitution()
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Empty );
      return EnqueueRequest( logApi, null, ConstRequestType.GET, QueryListKeyMap.GET_ALL_INSTITUTION );
    }

    [HttpGet( QueryListKeyMap.GET_INSTITUTION_BY_ID )]
    public Response<Institution> GetInstitutionById( int id )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "id={0}", id.ToString() ) );

      QueryResult reqResult = ExecuteRequest<Institution>( logApi, new List<string>() { id.ToString() }, ConstRequestType.GET,
        QueryListKeyMap.GET_INSTITUTION_BY_ID, true );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<Institution>( reqResult, reqResult.Succeed );

      return GetResponseSingleModel<Institution>( reqResult );
    }
  }
}
