using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
  public class MemberController : QueryControllerBase
  {
    public MemberController( ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager )
      : base( logger, queryOperatorManager )
    {
    }

    [HttpGet( QueryListKeyMap.GET_MEMBER_BY_ID )]
    public Response<CombinedMemberInstitutionFaculty> GetMemberById( int memberid )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "memberid={0}", memberid.ToString() ) );
      QueryResult reqResult = ExecuteRequest<Member>( logApi, new List<string>() { memberid.ToString() }, ConstRequestType.GET,
        QueryListKeyMap.GET_MEMBER_BY_ID, true );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<CombinedMemberInstitutionFaculty>( reqResult, reqResult.Succeed );

      CombinedMemberInstitutionFaculty result = new CombinedMemberInstitutionFaculty();
      Member member = GetModelFromQueryResult<Member>( reqResult );
      result.Member = member;

      if( member.institution_id.HasValue )
      {
        QueryResult reqResultInstitution = ExecuteRequest<Institution>( logApi, new List<string>() { member.institution_id.Value.ToString() }, ConstRequestType.GET,
          QueryListKeyMap.GET_INSTITUTION_BY_ID, true );

        if( reqResultInstitution.Succeed )
          result.Institution = GetModelFromQueryResult<Institution>( reqResultInstitution );
      }

      if( member.faculty_id.HasValue )
      {
        QueryResult reqResultFaculty = ExecuteRequest<Institution>( logApi, new List<string>() { member.faculty_id.Value.ToString() }, ConstRequestType.GET,
          QueryListKeyMap.GET_FACULTY_BY_ID, true );

        if( reqResultFaculty.Succeed )
          result.Faculty = GetModelFromQueryResult<Faculty>( reqResultFaculty );
      }

      return GetResponseSingleModelCustom( reqResult, result );
    }

    [HttpGet( QueryListKeyMap.GET_MEMBERS_BY_LIST_ID )]
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

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInput( null, stringId )
      };
      IList<string> paramQuery = new List<string>() { string.Format( "({0})", stringId ) };
      QueryResult reqResult = ExecuteRequest<Member>( logApi, paramQuery, ConstRequestType.GET, QueryListKeyMap.GET_MEMBERS_BY_LIST_ID, preCheckFuncs: preCheckFuncs );

      if( !reqResult.Succeed )
        return GetResponseBlankMultiModels<Member>( reqResult, reqResult.Succeed );

      return GetResponseMultiModels<Member>( reqResult );
    }
  }
}
