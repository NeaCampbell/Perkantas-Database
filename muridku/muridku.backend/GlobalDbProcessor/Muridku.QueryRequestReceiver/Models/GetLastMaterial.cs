using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Models
{
  public class GetLastMaterial
  {
    public long id { get; set; }
    public string code { get; set; }
    public string name { get; set; }
    public string custom_name { get; set; }
    public int chapter_count { get; set; }
    public int chapter { get; set; }
  }
}
