using System;

namespace Muridku.QueryRequestReceiver.Models
{
  public class User
  {
    public int id { get; set; }
    public int member_id { get; set; }
    public string email { get; set; }
    public string password { get; set; }
    public string usr_crt { get; set; }
    public DateTime dtm_crt { get; set; }
    public string usr_upd { get; set; }
    public DateTime dtm_upd { get; set; }
  }
}
