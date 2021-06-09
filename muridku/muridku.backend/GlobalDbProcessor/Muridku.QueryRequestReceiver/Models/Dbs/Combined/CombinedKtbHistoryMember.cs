using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Models.Dbs.Combined
{
  public class CombinedKtbHistoryMember
  {
    public KtbHistory ktbhistory { get; set; }
    public IList<Member> members { get; set; }
  }
}
