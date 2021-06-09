using System;
using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Models
{
  public class NewKtbHistory
  {
    public long ktb_id { get; set; }
    public DateTime meet_dt { get; set; }
    public long material_id { get; set; }
    public string material_name { get; set; }
    public int material_chapter { get; set; }
    public IList<NewKtbHistoryMember> members { get; set; }
  }
}
