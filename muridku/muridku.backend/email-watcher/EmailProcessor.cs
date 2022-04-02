using EmailWatcher.Database;
using EmailWatcher.Database.Model;
using MailKit;
using MailKit.Net.Imap;
using MailKit.Search;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;

namespace EmailWatcher
{
  public class EmailProcessor : IEmailProcessor
  {
    private readonly int _totalRetry = 3;
    private readonly ConfigParameter _config;
    private readonly ISQLExecutor _sqlExecutor;

    public EmailProcessor(ConfigParameter config, ISQLExecutor executor)
    {
      _config = config;
      _sqlExecutor = executor;
    }

    private bool TryConnect()
    {
      int retryCount = 0;
      bool isConnect = _sqlExecutor.Connect();

      while (!isConnect && retryCount < _totalRetry)
      {
        isConnect = _sqlExecutor.Connect();
        retryCount++;
      }

      if (!isConnect)
      {
        Console.WriteLine("Connection cannot be established.");
        return false;
      }

      return true;
    }

    public void BlastEmail()
    {
      if (TryConnect())
      {
        IList<EmailParameter> emailParams = _sqlExecutor.RetrieveNewOutboxEmail();

        if (emailParams == null || emailParams.Count == 0)
        {
          _sqlExecutor.Disconnect();
          return;
        }

        Credential credential;

        try
        {
          credential = _sqlExecutor.GetSenderCredential();
        }
        catch (Exception ex)
        {
          _sqlExecutor.Disconnect();
          Console.WriteLine(ex.Message);
          return;
        }

        foreach (EmailParameter emailParam in emailParams)
        {
          try
          {
            using SmtpClient smtp = new SmtpClient()
            {
              Host = _config.Host,
              Port = _config.Port,
              EnableSsl = _config.EnableSsl,
              DeliveryMethod = Enum.Parse<SmtpDeliveryMethod>(_config.DeliveryMethod),
              UseDefaultCredentials = _config.UseDefaultCredentials,
              Credentials = new NetworkCredential(credential.Username, credential.Password)
            };

            bool updateResult = true;
            using MailMessage msg = new MailMessage(credential.Username, emailParam.Destination)
            {
              Subject = emailParam.Subject,
              Body = emailParam.Body
            };

            try
            {
              smtp.Send(msg);
              updateResult = _sqlExecutor.UpdateOutboxStatus(emailParam.OutboxId, credential, EnumOutboxStatus.Succeed);
            }
            catch
            {
              if (updateResult)
                _sqlExecutor.UpdateOutboxStatus(emailParam.OutboxId, credential, EnumOutboxStatus.Failed);
            }
          }
          catch (Exception ex)
          {
            Console.WriteLine(ex.Message);
          }
        }

        _sqlExecutor.Disconnect();
      }
    }

    public void RetrieveEmail()
    {
      if (TryConnect())
      {
        Credential credential;

        try
        {
          credential = _sqlExecutor.GetSenderCredential();
        }
        catch (Exception ex)
        {
          Console.WriteLine(ex.Message);
          _sqlExecutor.Disconnect();
          return;
        }

        try
        {
          using ImapClient client = new ImapClient();
          client.Connect(_config.Host, _config.Port, _config.EnableSsl);
          client.Authenticate(credential.Username, credential.Password);
          client.Inbox.Open(FolderAccess.ReadWrite);

          foreach (UniqueId uid in client.Inbox.Search(SearchQuery.NotSeen))
          {
            try
            {
              MimeMessage message = client.Inbox.GetMessage(uid);
              client.Inbox.SetFlags(uid, MessageFlags.Seen, true);
            }
            catch (Exception ex)
            {
              Console.WriteLine(ex.Message);
              continue;
            }
          }

          client.Disconnect(true);
        }
        catch (Exception ex)
        {
          Console.WriteLine(ex.Message);
        }

        _sqlExecutor.Disconnect();
      }
    }
  }
}
