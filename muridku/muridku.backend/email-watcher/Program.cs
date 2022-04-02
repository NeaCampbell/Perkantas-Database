using EmailWatcher.Database;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace EmailWatcher
{
  public class Program
  {
    private static bool _shouldWatcherActive = true;
    private static readonly int _watcherSleepTime = 5000;
    private static Thread _watcher;
    private static ISQLExecutor _executor;

    private static void RunWatcher(ConfigParameter config, ISQLExecutor executor)
    {
      IEmailProcessor emailProcessor = new EmailProcessor(config, executor);

      while (_shouldWatcherActive)
      {
        emailProcessor.BlastEmail();
        Thread.Sleep(_watcherSleepTime);
      }

      Console.WriteLine("Watching process stopped..");
    }

    private static ConfigParameter GetConfigParameter()
    {
      IConfiguration configuration = new ConfigurationBuilder()
        .AddJsonFile("config.json", true, true)
        .Build();
      IConfigurationSection param = configuration.GetSection(nameof(ConfigParameter));
      IList<IConfigurationSection> paramChildren = param.GetChildren().ToList();
      ConfigParameter config = new ConfigParameter();

      foreach (IConfigurationSection child in paramChildren)
      {
        switch(child.Key)
        {
          case nameof(config.ConnectionString):
            config.ConnectionString = child.Value;
            break;
          case nameof(config.Host):
            config.Host = child.Value;
            break;
          case nameof(config.Port):
            config.Port = Convert.ToInt32(child.Value);
            break;
          case nameof(config.EnableSsl):
            config.EnableSsl = Convert.ToBoolean(child.Value);
            break;
          case nameof(config.DeliveryMethod):
            config.DeliveryMethod = child.Value;
            break;
          case nameof(config.UseDefaultCredentials):
            config.UseDefaultCredentials = Convert.ToBoolean(child.Value);
            break;
          default:
            break;
        }
      }

      return config;
    }

    public static void Main(string[] args)
    {
      ConfigParameter config = GetConfigParameter();
      _executor = new MySQLExecutor(config.ConnectionString);
      _watcher = new Thread(() => RunWatcher(config, _executor));
      _watcher.Start();
      AppDomain.CurrentDomain.ProcessExit += new EventHandler(CurrentDomain_ProcessExit);
      Console.CancelKeyPress += (sender, args) => OnCancelKeyPress(sender, args);
    }

    private static void OnCancelKeyPress(object sender, ConsoleCancelEventArgs args)
    {
      CurrentDomain_ProcessExit(sender, null);
      Environment.Exit(-1);
    }

    private static void CurrentDomain_ProcessExit(object sender, EventArgs e)
    {
      Console.WriteLine("exit");

      if (_watcher.ThreadState != ThreadState.WaitSleepJoin && _watcher.ThreadState != ThreadState.Running)
        return;

      _shouldWatcherActive = false;
      _watcher.Join();
      _executor.Dispose();
    }
  }
}
