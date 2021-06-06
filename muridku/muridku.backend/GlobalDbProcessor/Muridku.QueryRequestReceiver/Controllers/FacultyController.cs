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
  public class FacultyController : QueryControllerBase
  {
    public FacultyController( ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager )
      : base( logger, queryOperatorManager )
    {
    }

    protected override void OnQueuedQueryExecutedHandler( object sender, QueryResult result )
    {
      if( RequestId == result.RequestId )
      {
        base.OnQueuedQueryExecutedHandler( sender, result );

        switch( result.RequestCode )
        {
          case QueryListKeyMap.GET_ALL_FACULTY:
            //Logger.LogInformation( "    Query Result {0} = {1}", result.RequestId, result.Result );
            break;
          default:
            break;
        }
      }
    }

    [HttpGet(QueryListKeyMap.GET_ALL_FACULTY)]
    public QueryResult GetAllFaculty()
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Empty);
      return EnqueueRequest(logApi, null, ConstRequestType.GET, QueryListKeyMap.GET_ALL_FACULTY, QueryListKeyMap.GET_ALL_FACULTY);
    }

    [HttpGet( QueryListKeyMap.GET_FACULTY_BY_INSTITUTION_ID )]
    public Response<IList<Faculty>> GetFacultyByInstitutionId( int institutionid )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "institutionid={0}", institutionid.ToString() ) );

      QueryResult reqResult = ExecuteRequest<Faculty>( logApi, new List<string>() { institutionid.ToString() }, ConstRequestType.GET,
        QueryListKeyMap.GET_FACULTY_BY_INSTITUTION_ID, QueryListKeyMap.GET_FACULTY_BY_INSTITUTION_ID );

      if( !reqResult.Succeed )
        return GetResponseBlankMultiModels<Faculty>( reqResult, reqResult.Succeed );

      return GetResponseMultiModels<Faculty>( reqResult );
    }

    [HttpGet( QueryListKeyMap.GET_FACULTY_BY_ID )]
    public Response<Faculty> GetFacultyById( int id )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "id={0}", id.ToString() ) );

      QueryResult reqResult = ExecuteRequest<Faculty>( logApi, new List<string>() { id.ToString() }, ConstRequestType.GET,
        QueryListKeyMap.GET_FACULTY_BY_ID, QueryListKeyMap.GET_FACULTY_BY_ID, true );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<Faculty>( reqResult, reqResult.Succeed );

      return GetResponseSingleModel<Faculty>( reqResult );
    }
  }
}
