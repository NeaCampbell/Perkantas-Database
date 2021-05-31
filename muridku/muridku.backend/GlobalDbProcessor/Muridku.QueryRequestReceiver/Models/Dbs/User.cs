using System;

namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class User : ModelDbBase
  {
    public long member_id { get; set; }
    public string email { get; set; }
    public string password { get; set; }
    public int is_active { get; set; }
  }
}
