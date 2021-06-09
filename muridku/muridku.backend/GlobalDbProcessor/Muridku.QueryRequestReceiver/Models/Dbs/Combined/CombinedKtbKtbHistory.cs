using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Models.Dbs.Combined
{
  public class CombinedKtbKtbHistory
  {
    public Ktb ktb { get; set; }
    public IList<CombinedKtbHistoryMember> histories { get; set; }
  }
}
