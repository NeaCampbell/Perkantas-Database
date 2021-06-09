using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Models
{
  public class ActivateUser
  {
    public long id { get; set; }
    public string email { get; set; }
    public int is_active { get; set; }
  }
}
