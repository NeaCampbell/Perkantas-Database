using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
  public class MemberController : QueryControllerBase
  {
    private const string _defaultPassword = "password";

    public MemberController( ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager )
      : base( logger, queryOperatorManager )
    {
    }

    [HttpGet( QueryListKeyMap.GET_MEMBER_BY_ID )]
    public Response<CombinedMemberCityUserInstituteFaculty> GetMemberById( int memberid )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Format( "memberid={0}", memberid.ToString() ) );
      QueryResult reqResult = ExecuteRequest<Member>( logApi, new List<string>() { memberid.ToString() }, ConstRequestType.GET,
        QueryListKeyMap.GET_MEMBER_BY_ID, QueryListKeyMap.GET_MEMBER_BY_ID, true );

      if( !reqResult.Succeed )
        return GetResponseBlankSingleModel<CombinedMemberCityUserInstituteFaculty>( reqResult, reqResult.Succeed );

      GlobalHelperController helper = new GlobalHelperController( Logger, QueryOperatorManager, HttpContext );
      CombinedMemberCityUserInstituteFaculty result = helper.GetCompleteMemberData( GetModelFromQueryResult<Member>( reqResult ), logApi, QueryListKeyMap.GET_MEMBER_BY_ID );
      return GetResponseSingleModelCustom( reqResult, result );
    }

    [HttpGet( QueryListKeyMap.GET_MEMBERS_BY_LIST_ID )]
    public Response<IList<CombinedMemberCityUserInstituteFaculty>> GetMembersByListId( [FromQuery] int[] listid )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), string.Empty );
      string stringId = string.Empty;

      foreach( int id in listid )
      {
        if( stringId.Equals( string.Empty ) )
        {
          stringId = string.Format( "{0}", id.ToString() );
          logApi.param_input = string.Format( "listid={0}", id.ToString() );
          continue;
        }

        stringId += string.Format( ",{0}", id.ToString() );
        logApi.param_input += string.Format( "&listid={0}", id.ToString() );
      }

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
      {
        () => ValidateParamInputString( new Tuple<string, string, int>( "listid", stringId, stringId.Length ) )
      };
      IList<string> paramQuery = new List<string>() { string.Format( "({0})", stringId ) };
      QueryResult reqResult = ExecuteRequest<Member>( logApi, paramQuery, ConstRequestType.GET,
        QueryListKeyMap.GET_MEMBERS_BY_LIST_ID, QueryListKeyMap.GET_MEMBERS_BY_LIST_ID, preCheckFuncs: preCheckFuncs );

      if( !reqResult.Succeed )
        return GetResponseBlankMultiModels<CombinedMemberCityUserInstituteFaculty>( reqResult, reqResult.Succeed );

      IList<CombinedMemberCityUserInstituteFaculty> result = new List<CombinedMemberCityUserInstituteFaculty>();
      IList<Member> members = GetModelListFromQueryResult<Member>( reqResult );
      GlobalHelperController helper = new GlobalHelperController( Logger, QueryOperatorManager, HttpContext );

      foreach( Member member in members )
        result.Add( helper.GetCompleteMemberData( member, logApi, QueryListKeyMap.GET_MEMBERS_BY_LIST_ID ) );

      return GetResponseMultiModelsCustom( reqResult, result );
    }

    [HttpGet( QueryListKeyMap.GET_MEMBERS_BY_KTB_ID )]
    public Response<IList<CombinedMemberCityUserInstituteFaculty>> GetMembersByKtbId( int ktbid )
    {
      LogApi logApi = CreateLogApiObj( GetCurrentMethod(), ktbid.ToString() );
      IList<string> paramQuery = new List<string>() { ktbid.ToString() };
      QueryResult reqResult = ExecuteRequest<Member>( logApi, paramQuery, ConstRequestType.GET, QueryListKeyMap.GET_MEMBERS_BY_KTB_ID,
        QueryListKeyMap.GET_MEMBERS_BY_KTB_ID );

      if( !reqResult.Succeed )
        return GetResponseBlankMultiModels<CombinedMemberCityUserInstituteFaculty>( reqResult, reqResult.Succeed );

      IList<CombinedMemberCityUserInstituteFaculty> result = new List<CombinedMemberCityUserInstituteFaculty>();
      IList<Member> members = GetModelListFromQueryResult<Member>( reqResult );
      GlobalHelperController helper = new GlobalHelperController( Logger, QueryOperatorManager, HttpContext );

      foreach( Member member in members )
        result.Add( helper.GetCompleteMemberData( member, logApi, QueryListKeyMap.GET_MEMBERS_BY_KTB_ID ) );

      return GetResponseMultiModelsCustom( reqResult, result );
    }

    [HttpPost(QueryListKeyMap.SAVE_SINGLE_MEMBER)]
    public QueryResult SaveSingleMember([FromBody] CombinedKtbMemberEmail data)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), JsonConvert.SerializeObject(data));

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>()
      {
        () => ValidateParamInputLong( new Tuple<string, long?>( "ktb_id", data.ktb_id ),
                                      new Tuple<string, long?>( "city_id", data.city_id ) ),
        () => ValidateParamInputString( new Tuple<string, string, int>( "email", data.email, 100 ),
                                        new Tuple<string, string, int>( "name", data.name, 100 ),
                                        new Tuple<string, string, int>( "address", data.address, 200 ) ),
        () => ValidateStringLength( string.IsNullOrEmpty(data.gender) ? string.Empty : data.gender, 1, "gender" ),
        () => ValidateStringLength( string.IsNullOrEmpty(data.birth_place) ? string.Empty : data.birth_place, 100, "birth_place" ),
        () => ValidateStringLength( string.IsNullOrEmpty(data.mobile_phn) ? string.Empty : data.mobile_phn, 20, "mobile_phn" )
      };

      string encryptedPassword = CipherCentre.EncryptMD5(_defaultPassword ?? string.Empty,
                                                         QueryOperatorManager.EncryptMD5HashFormat,
                                                         QueryOperatorManager.EncryptMD5HashCultureInfo);

      IList<string> paramQuery = new List<string>()
      {
        data.ktb_id.ToString(),
        data.member_id.HasValue ? data.member_id.ToString() : string.Empty,
        data.email,
        encryptedPassword,
        data.name,
        data.gender,
        data.city_id.ToString(),
        data.address,
        data.birth_dt.HasValue ? data.birth_dt.Value.ToString( CommonFormat.YYYY_MM_DD ) : string.Empty,
        data.birth_place,
        data.mobile_phn,
        data.inst_type,
        data.institution_id.HasValue ? data.institution_id.Value.ToString() : string.Empty,
        data.faculty_id.HasValue ? data.faculty_id.Value.ToString() : string.Empty,
        GetUsernameFromHeader( HttpContext )
      };

      return ExecuteRequest<Member>(logApi, paramQuery, ConstRequestType.POST, QueryListKeyMap.SAVE_SINGLE_MEMBER,
        QueryListKeyMap.SAVE_SINGLE_MEMBER, isSingleRow: true, preCheckFuncs: preCheckFuncs, isNeedValidUser: true);
    }

    [HttpPut(QueryListKeyMap.UPDATE_SINGLE_MEMBER)]
    public QueryResult UpdateSingleMember([FromBody] CombinedKtbMemberEmail data)
    {
      LogApi logApi = CreateLogApiObj(GetCurrentMethod(), JsonConvert.SerializeObject(data));

      IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>()
      {
        () => ValidateParamInputLong( new Tuple<string, long?>( "id", data.id ),
                                      new Tuple<string, long?>( "city_id", data.city_id ) ),
        () => ValidateParamInputString( new Tuple<string, string, int>( "email", data.email, 100 ),
                                        new Tuple<string, string, int>( "name", data.name, 100 ),
                                        new Tuple<string, string, int>( "address", data.address, 200 ) ),
        () => ValidateStringLength( string.IsNullOrEmpty(data.gender) ? string.Empty : data.gender, 1, "gender" ),
        () => ValidateStringLength( string.IsNullOrEmpty(data.birth_place) ? string.Empty : data.birth_place, 100, "birth_place" ),
        () => ValidateStringLength( string.IsNullOrEmpty(data.mobile_phn) ? string.Empty : data.mobile_phn, 20, "mobile_phn" )
      };

      IList<string> paramQuery = new List<string>()
      {
        data.email,
        data.id.ToString(),
        data.name,
        data.gender,
        data.city_id.ToString(),
        data.address,
        data.birth_dt.HasValue ? data.birth_dt.Value.ToString( CommonFormat.YYYY_MM_DD ) : string.Empty,
        data.birth_place,
        data.mobile_phn,
        data.inst_type,
        data.institution_id.HasValue ? data.institution_id.Value.ToString() : string.Empty,
        data.faculty_id.HasValue ? data.faculty_id.Value.ToString() : string.Empty,
        GetUsernameFromHeader( HttpContext )
      };

      return ExecuteRequest<Member>(logApi, paramQuery, ConstRequestType.PUT, QueryListKeyMap.UPDATE_SINGLE_MEMBER,
        QueryListKeyMap.UPDATE_SINGLE_MEMBER, isSingleRow: true, preCheckFuncs: preCheckFuncs, isNeedValidUser: true);
    }
  }
}
