using Common;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using QueryManager;
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

        private static IConfigSource CreateDbConfigSource(IConfiguration config)
        {
            DatabaseConfig dbConfig = config.GetSection("DatabaseConfig").Get<DatabaseConfig>();
            IConfigSource configSource = new FileConfigSource(dbConfig.DatabasePath, ConfigFileType.Xml);
            configSource.SetValue("QueryPath", dbConfig.QueryPath);
            return configSource;
        }

        private static IQueryOperatorManager<DbServiceType> CreateQueryOperatorManager(IConfiguration config, IConfigSource dbConfigSource)
        {
            DbServiceType dbServiceType = config.GetSection("DbServiceType").Get<DbServiceType>();
            Console.WriteLine("Database Service Type = {0}", dbServiceType.ToString());
            int threadCount = config.GetSection("ThreadCount").Get<int>();
            Console.WriteLine("Total thread allowed = {0}", threadCount);

            string serverAddress = dbConfigSource.GetValue("ServerAddress", string.Empty);
            string portNumber = dbConfigSource.GetValue("PortNumber", string.Empty);
            string username = dbConfigSource.GetValue("Username", string.Empty);
            string password = dbConfigSource.GetValue("Password", string.Empty);
            string dbName = dbConfigSource.GetValue("DbName", string.Empty);

            string connectionString = string.Format("Host={0};Port={1};User ID={2};Password={3};Database={4};Pooling=true;",
                serverAddress,
                portNumber,
                username,
                password,
                dbName
              );

            return new QueryOperatorManager(dbServiceType, connectionString, dbConfigSource, threadCount);
        }

        public static void Main(string[] args)
        {
            IConfiguration config = CreateConfiguration(AppDomain.CurrentDomain.BaseDirectory);
            IConfigSource dbConfigSource = CreateDbConfigSource(config);
            _queryOperatorManager = CreateQueryOperatorManager(config, dbConfigSource);
            _queryOperatorManager.OpenDbConnection();
            CreateHostBuilder(args).Build().Run();
            _queryOperatorManager.CloseDbConnection();
            _queryOperatorManager.Dispose();
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
