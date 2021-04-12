using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Middleware
{
  public class SecurityHeaderPolicy : IHeaderPolicy
  {
    public IDictionary<string, string> SetHeaders { get; private set; } = new Dictionary<string, string>();

    public IList<string> RemovedHeaders { get; private set; } = new List<string>();
  }
}
