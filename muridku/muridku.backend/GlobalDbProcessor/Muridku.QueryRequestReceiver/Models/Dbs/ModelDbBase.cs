using System;

namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public abstract class ModelDbBase
  {
    public long id { get; set; }
    public string usr_crt { get; set; }
    public DateTime dtm_crt { get; set; }
    public string usr_upd { get; set; }
    public DateTime dtm_upd { get; set; }
  }
}
