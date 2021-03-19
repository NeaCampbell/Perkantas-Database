using Common;
using Common.ConfigSource;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;

namespace Muridku.QueryRequestReceiver
{
    public class Program
    {
        private static IQueryOperatorManager<DbServiceType> _queryOperatorManager;

        private static IConfiguration CreateConfiguration(string configDir)
        {
            IConfigurationBuilder builder = new ConfigurationBuilder()
                                          .SetBasePath(configDir)
                                          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            return builder.Build();
        }

        private static string CreateConnectionString(IConfigSource dbConfigSource)
        {
            string serverAddress = dbConfigSource.GetValue("ServerAddress", string.Empty);
            string portNumber = dbConfigSource.GetValue("PortNumber", string.Empty);
            string username = dbConfigSource.GetValue("Username", string.Empty);
            string password = dbConfigSource.GetValue("Password", string.Empty);
            string dbName = dbConfigSource.GetValue("DbName", string.Empty);

            return string.Format("Host={0};Port={1};User ID={2};Password={3};Database={4};Pooling=true;",
                serverAddress,
                portNumber,
                username,
                password,
                dbName
            );
        }

        private static IConfigSource CreateDbConfigSource(IConfiguration config)
        {
            DatabaseConfig dbConfig = config.GetSection("DatabaseConfig").Get<DatabaseConfig>();
            ThreadConfig threadConfig = config.GetSection("ThreadConfig").Get<ThreadConfig>();

            IConfigSource configSource = ConfigSourceBuilder.BuildFileConfigSource(dbConfig.DatabasePath, ConfigFileType.Xml);
            configSource.SetValue("DbServiceType", dbConfig.DbServiceType);
            configSource.SetValue("ConnectionString", CreateConnectionString(configSource));
            configSource.SetValue("QueryPath", dbConfig.QueryPath);
            configSource.SetValue("MaxQueueCount", threadConfig.MaxQueueCount);
            configSource.SetValue("ThreadCount", threadConfig.ThreadCount);
            configSource.SetValue("ThreadPoolWaitingTime", threadConfig.ThreadPoolWaitingTime);
            configSource.SetValue("RequestWaitingTime", threadConfig.RequestWaitingTime);

            return configSource;
        }

        public static void Main(string[] args)
        {
            IConfiguration config = CreateConfiguration(AppDomain.CurrentDomain.BaseDirectory);
            IConfigSource dbConfigSource = CreateDbConfigSource(config);

            _queryOperatorManager = new QueryOperatorManager(dbConfigSource);
            _queryOperatorManager.OnQueuedQueryCancelled += OnQueuedQueryCancelled;
            _queryOperatorManager.OpenDbConnection();

            CreateHostBuilder(args).Build().Run();

            _queryOperatorManager.CloseDbConnection();
            _queryOperatorManager.OnQueuedQueryCancelled -= OnQueuedQueryCancelled;
            _queryOperatorManager.Dispose();
        }

        private static void OnQueuedQueryCancelled(object sender, string reason, QueryRequestParam param)
        {
            Console.WriteLine(reason);
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureServices(servicesCollection =>
                {
                    servicesCollection.AddSingleton(_queryOperatorManager);
                });
    }
}
