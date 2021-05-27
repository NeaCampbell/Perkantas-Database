using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Models.Dbs.Combined
{
  public class CombinedKtbMember
  {
    public Ktb Ktb { get; set; }
    public IList<CombinedMemberUserInstituteFaculty> Members { get; set; }
  }
}
