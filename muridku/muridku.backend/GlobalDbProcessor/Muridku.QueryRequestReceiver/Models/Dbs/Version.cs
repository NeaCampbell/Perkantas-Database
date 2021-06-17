using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class Version : ModelDbBase
  {
    public string type { get; set; }
    public string version_no { get; set; }
  }
}
