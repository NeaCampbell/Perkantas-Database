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
    private static IConfigSource _configSource;

    private static IConfiguration CreateConfiguration( string configDir )
    {
      IConfigurationBuilder builder = new ConfigurationBuilder()
                                          .SetBasePath( configDir )
                                          .AddJsonFile( "appsettings.json", optional: true, reloadOnChange: true );

      return builder.Build();
    }

    private static string CreateConnectionString( IConfigSource dbConfigSource )
    {
      string serverAddress = dbConfigSource.GetValue( "ServerAddress", string.Empty );
      string portNumber = dbConfigSource.GetValue( "PortNumber", string.Empty );
      string username = dbConfigSource.GetValue( "Username", string.Empty );
      string password = dbConfigSource.GetValue( "Password", string.Empty );
      string dbName = dbConfigSource.GetValue( "DbName", string.Empty );
      string idleTimeout = dbConfigSource.GetValue("ConnectionIdleTimeout", string.Empty);

      return string.Format("Host={0};Port={1};User ID={2};Password={3};Database={4};ConnectionIdleTimeout={5};Pooling=true;",
        serverAddress,
        portNumber,
        username,
        password,
        dbName,
        idleTimeout
      );
    }

    private static IConfigSource CreateConfigSource( IConfiguration config )
    {
      DatabaseConfig dbConfig = config.GetSection( "DatabaseConfig" ).Get<DatabaseConfig>();
      ThreadConfig threadConfig = config.GetSection( "ThreadConfig" ).Get<ThreadConfig>();

      IConfigSource configSource = ConfigSourceBuilder.BuildFileConfigSource( dbConfig.DatabasePath, ConfigFileType.Xml );
      configSource.SetValue( "DbServiceType", dbConfig.DbServiceType );
      configSource.SetValue( "ConnectionString", CreateConnectionString( configSource ) );
      configSource.SetValue( "QueryPath", dbConfig.QueryPath );
      configSource.SetValue( "MaxQueueCount", threadConfig.MaxQueueCount );
      configSource.SetValue( "ThreadCount", threadConfig.ThreadCount );
      configSource.SetValue( "ThreadPoolWaitingTime", threadConfig.ThreadPoolWaitingTime );
      configSource.SetValue( "RequestWaitingTime", threadConfig.RequestWaitingTime );
      configSource.SetValue( "MaxRequestTimeout", threadConfig.MaxRequestTimeout );
      configSource.SetValue( "HeaderToken", config.GetSection( "HeaderToken" ) );

      return configSource;
    }

    public static void Main( string[] args )
    {
      IConfiguration config = CreateConfiguration( AppDomain.CurrentDomain.BaseDirectory );
      _configSource = CreateConfigSource( config );

      _queryOperatorManager = new QueryOperatorManager( _configSource );
      _queryOperatorManager.OnQueuedQueryCancelled += OnQueuedQueryCancelled;
      _queryOperatorManager.OpenDbConnection();

      CreateHostBuilder( args ).Build().Run();

      _queryOperatorManager.CloseDbConnection();
      _queryOperatorManager.OnQueuedQueryCancelled -= OnQueuedQueryCancelled;
      _queryOperatorManager.Dispose();
    }

    private static void OnQueuedQueryCancelled( object sender, string reason, QueryRequestParam param )
    {
      Console.WriteLine( reason );
    }

    public static IHostBuilder CreateHostBuilder( string[] args ) =>
      Host.CreateDefaultBuilder( args )
          .ConfigureWebHostDefaults( webBuilder =>
          {
            webBuilder.UseStartup<Startup>();
          } )
          .ConfigureServices( servicesCollection =>
          {
            servicesCollection.AddSingleton( _queryOperatorManager );
          } );
  }
}
