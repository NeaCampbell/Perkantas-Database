using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Middleware
{
  public interface IHeaderPolicy
  {
    IDictionary<string, string> SetHeaders { get; }
    IList<string> RemovedHeaders { get; }
  }
}
