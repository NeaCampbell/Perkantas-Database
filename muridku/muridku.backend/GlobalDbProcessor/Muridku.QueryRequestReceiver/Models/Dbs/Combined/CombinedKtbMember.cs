using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Models.Dbs.Combined
{
  public class CombinedKtbMember
  {
    public Ktb ktb { get; set; }
    public IList<CombinedMemberCityUserInstituteFaculty> members { get; set; }
    public IList<KtbMember> ktbmembers { get; set; }
  }
}
