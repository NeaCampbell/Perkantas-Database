using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class City : ModelDbBase
  {
    public string code { get; set; }
    public string name { get; set; }
  }
}
