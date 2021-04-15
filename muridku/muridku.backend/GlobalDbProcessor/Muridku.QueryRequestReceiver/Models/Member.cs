using System;

namespace Muridku.QueryRequestReceiver.Models
{
  public class Member
  {
    public int id { get; set; }
    public string name { get; set; }
    public string address { get; set; }
    public DateTime? birth_dt { get; set; }
    public string birth_place { get; set; }
    public string mobile_phn { get; set; }
    public int? institution_id { get; set; }
    public int? faculty_id { get; set; }
    public string usr_crt { get; set; }
    public DateTime dtm_crt { get; set; }
    public string usr_upd { get; set; }
    public DateTime dtm_upd { get; set; }
  }
}
