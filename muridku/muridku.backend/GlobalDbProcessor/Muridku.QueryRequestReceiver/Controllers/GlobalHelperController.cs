using Common;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Dbs.Combined;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;
using System.Text;

namespace Muridku.QueryRequestReceiver.Controllers
{
  public class GlobalHelperController : QueryControllerBase
  {
    private readonly HttpContext _customContext;

    public GlobalHelperController(ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager, HttpContext context)
      : base(logger, queryOperatorManager)
    {
      _customContext = context;
    }

    public CombinedKtbMember GetAktbsByKtbId(Ktb ktb, LogApi logApi, string requestCode)
    {
      CombinedKtbMember result = new CombinedKtbMember
      {
        ktb = ktb
      };

      QueryResult reqResultMember = ExecuteRequest<Member>(logApi, new List<string>() { ktb.id.ToString() }, ConstRequestType.GET,
        requestCode, QueryListKeyMap.GET_AKTBS_BY_KTB_ID, customContext: _customContext);

      if (reqResultMember.Succeed)
      {
        result.members = new List<CombinedMemberCityUserInstituteFaculty>();
        result.ktbmembers = new List<KtbMember>();
        IList<Member> members = GetModelListFromQueryResult<Member>(reqResultMember);

        foreach (Member member in members)
        {
          result.members.Add(GetCompleteMemberData(member, logApi, requestCode));
          QueryResult reqResultKtbMember = ExecuteRequest<KtbMember>(logApi, new List<string>() { ktb.id.ToString(), member.id.ToString() }, ConstRequestType.GET,
            requestCode, QueryListKeyMap.GET_SINGLE_KTB_MEMBER_BY_KTB_ID_MEMBER_ID, isSingleRow: true, customContext: _customContext);

          if (reqResultKtbMember.Succeed)
            result.ktbmembers.Add(GetModelFromQueryResult<KtbMember>(reqResultKtbMember));
        }
      }

      return result;
    }

    public CombinedKtbKtbHistory GetKtbHistoryByKtbId(Ktb ktb, LogApi logApi, string requestCode)
    {
      CombinedKtbKtbHistory result = new CombinedKtbKtbHistory
      {
        ktb = ktb,
        histories = new List<CombinedKtbHistoryMember>()
      };

      QueryResult reqResultHistory = ExecuteRequest<KtbHistory>(logApi, new List<string>() { ktb.id.ToString() }, ConstRequestType.GET,
        requestCode, QueryListKeyMap.GET_KTB_HISTORY_BY_KTB_ID, customContext: _customContext);

      if (reqResultHistory.Succeed)
      {
        IList<KtbHistory> histories = GetModelListFromQueryResult<KtbHistory>(reqResultHistory);

        foreach (KtbHistory history in histories)
        {
          CombinedKtbHistoryMember combinedHist = new CombinedKtbHistoryMember
          {
            ktbhistory = history,
            members = new List<Member>()
          };

          QueryResult reqResultMember = ExecuteRequest<Member>(logApi, new List<string>() { history.id.ToString() }, ConstRequestType.GET,
            requestCode, QueryListKeyMap.GET_KTB_HISTORY_MEMBER_BY_KTB_HISTORY_ID, customContext: _customContext);

          if (reqResultMember.Succeed)
          {
            IList<Member> members = GetModelListFromQueryResult<Member>(reqResultMember);

            foreach (Member member in members)
              combinedHist.members.Add(member);
          }

          result.histories.Add(combinedHist);
        }
      }

      return result;
    }

    public CombinedMemberCityUserInstituteFaculty GetCompleteMemberData( Member member, LogApi logApi, string requestCode )
    {
      CombinedMemberCityUserInstituteFaculty result = new CombinedMemberCityUserInstituteFaculty
      {
        member = member
      };

      QueryResult reqResultCity = ExecuteRequest<City>(logApi, new List<string>() { member.city_id.ToString() }, ConstRequestType.GET,
        requestCode, QueryListKeyMap.GET_CITY_BY_ID, isSingleRow: true, customContext: _customContext);

      if (reqResultCity.Succeed)
        result.city = GetModelFromQueryResult<City>(reqResultCity);

      QueryResult reqResultUser = ExecuteRequest<User>(logApi, new List<string>() { member.id.ToString() }, ConstRequestType.GET,
        requestCode, QueryListKeyMap.GET_USER_BY_MEMBER_ID, isSingleRow: true, customContext: _customContext);

      if (reqResultUser.Succeed)
      {
        result.user = GetModelFromQueryResult<User>(reqResultUser);
        result.user.password = null;
      }

      if ( member.institution_id.HasValue )
      {
        QueryResult reqResultInstitution = ExecuteRequest<Institution>( logApi, new List<string>() { member.institution_id.Value.ToString() }, ConstRequestType.GET,
          requestCode, QueryListKeyMap.GET_INSTITUTION_BY_ID, isSingleRow: true, customContext: _customContext );

        if( reqResultInstitution.Succeed )
          result.institution = GetModelFromQueryResult<Institution>( reqResultInstitution );
      }

      if( member.faculty_id.HasValue )
      {
        QueryResult reqResultFaculty = ExecuteRequest<Institution>( logApi, new List<string>() { member.faculty_id.Value.ToString() }, ConstRequestType.GET,
          requestCode, QueryListKeyMap.GET_FACULTY_BY_ID, isSingleRow: true, customContext: _customContext );

        if( reqResultFaculty.Succeed )
          result.faculty = GetModelFromQueryResult<Faculty>( reqResultFaculty );
      }

      return result;
    }

    public static string GeneratePassword(int length)
    {
      StringBuilder password = new StringBuilder();
      Random random = new Random();

      while (password.Length < length)
      {
        char c = (char)random.Next(32, 126);
        password.Append(c);
      }

      password.Append((char)random.Next(33, 48));
      password.Append((char)random.Next(48, 58));
      password.Append((char)random.Next(97, 123));
      password.Append((char)random.Next(65, 91));

      return password.ToString();
    }
  }
}
