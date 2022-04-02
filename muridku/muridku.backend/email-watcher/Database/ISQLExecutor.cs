using EmailWatcher.Database.Model;
using System;
using System.Collections.Generic;

namespace EmailWatcher.Database
{
  public interface ISQLExecutor: IDisposable
  {
    bool Connect();
    Credential GetSenderCredential();
    IList<EmailParameter> RetrieveNewOutboxEmail();
    bool UpdateOutboxStatus(long outboxId, Credential cred, EnumOutboxStatus status);
    bool Disconnect();
  }
}
