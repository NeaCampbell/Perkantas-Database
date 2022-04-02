using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace EmailWatcher
{
  public class ConfigParameter
  {
    public string ConnectionString { get; set; }
    public string Host { get; set; }
    public int Port { get; set; }
    public bool EnableSsl { get; set; }
    public string DeliveryMethod { get; set; }
    public bool UseDefaultCredentials { get; set; }

  }
}
