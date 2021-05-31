using System;

namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class UserDevice : ModelDbBase
  {
    public long user_id { get; set; }
    public string device_id { get; set; }
    public int is_logged_in { get; set; }
    public int is_stay_logged_in { get; set; }
    public DateTime last_login_dt { get; set; }
  }
}
