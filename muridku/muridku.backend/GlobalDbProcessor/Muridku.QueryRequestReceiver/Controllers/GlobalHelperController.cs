using Common;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Dbs.Combined;
using QueryManager;
using QueryOperator.QueryExecutor;
using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Controllers
{
  public class GlobalHelperController : QueryControllerBase
  {
    private readonly HttpContext _customContext;

    public GlobalHelperController( ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager, HttpContext context )
      : base( logger, queryOperatorManager )
    {
      _customContext = context;
    }

    public CombinedKtbMember GetAktbsByKtbId( Ktb ktb, LogApi logApi )
    {
      CombinedKtbMember result = new CombinedKtbMember
      {
        Ktb = ktb
      };

      QueryResult reqResultMember = ExecuteRequest<Member>( logApi, new List<string>() { ktb.id.ToString() }, ConstRequestType.GET,
        QueryListKeyMap.GET_AKTBS_BY_KTB_ID, customContext : _customContext );

      if( reqResultMember.Succeed )
        result.Members = GetModelListFromQueryResult<Member>( reqResultMember );

      return result;
    }

    public CombinedMemberInstitutionFaculty GetCompleteMemberData( Member member, LogApi logApi )
    {
      CombinedMemberInstitutionFaculty result = new CombinedMemberInstitutionFaculty
      {
        Member = member
      };

      if( member.institution_id.HasValue )
      {
        QueryResult reqResultInstitution = ExecuteRequest<Institution>( logApi, new List<string>() { member.institution_id.Value.ToString() }, ConstRequestType.GET,
          QueryListKeyMap.GET_INSTITUTION_BY_ID, isSingleRow: true, customContext: _customContext );

        if( reqResultInstitution.Succeed )
          result.Institution = GetModelFromQueryResult<Institution>( reqResultInstitution );
      }

      if( member.faculty_id.HasValue )
      {
        QueryResult reqResultFaculty = ExecuteRequest<Institution>( logApi, new List<string>() { member.faculty_id.Value.ToString() }, ConstRequestType.GET,
          QueryListKeyMap.GET_FACULTY_BY_ID, isSingleRow: true, customContext: _customContext );

        if( reqResultFaculty.Succeed )
          result.Faculty = GetModelFromQueryResult<Faculty>( reqResultFaculty );
      }

      return result;
    }
  }
}
