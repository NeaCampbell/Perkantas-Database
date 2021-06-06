using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Models
{
  public class UpdateAktb
  {
    public long id { get; set; }
  }

  public class UpdateAktbStatus
  {
    public long ktb_id { get; set; }
    public IList<UpdateAktb> list_id { get; set; }
  }
}
