using QueryOperator.QueryExecutor;

namespace QueryManager
{
  public delegate void QueryExecutedEventHandler( object sender, QueryResult result );
  public delegate void QueuedQueryExecutedEventHandler( object sender, QueryResult result );
  public delegate void QueuedQueryCancelledEventHandler( object sender, string reason, QueryRequestParam param );
}
