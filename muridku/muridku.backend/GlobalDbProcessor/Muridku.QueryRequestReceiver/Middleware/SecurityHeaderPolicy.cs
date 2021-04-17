﻿using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Middleware
{
  public class SecurityHeaderPolicy : IHeaderPolicy
  {
    public IDictionary<string, string> SetHeaders { get; private set; } = new Dictionary<string, string>();

    public IList<string> RemovedHeaders { get; private set; } = new List<string>();
  }
}
