using System;

namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class Ktb : ModelDbBase
  {
    public string code { get; set; }
    public string name { get; set; }
    public DateTime? last_meet_dt { get; set; }
    public string last_material_name { get; set; }
    public int? last_material_chapter { get; set; }
  }
}
