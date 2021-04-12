using Common;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Threading;

namespace UnitTest
{
  class Program
  {
    static void Main( string[] args )
    {
      Console.WriteLine( "Hello World!" );
      QueryOperatorManager queryManager = new QueryOperatorManager( null );
      queryManager.OnQueryExecuted += OnQueryExecuted;
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.OpenDbConnection();
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      queryManager.EnqueueQuery( new QueryRequestParam( ProcessType.Select, "", null, "" ) );
      Thread.Sleep( 30000 );
      queryManager.CloseDbConnection();
      Console.ReadKey();
    }

    static void OnQueryExecuted( object sender, QueryResult result )
    {
      Console.WriteLine( result );
    }
  }
}
