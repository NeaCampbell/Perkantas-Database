namespace QueryOperator.QueryExecutor
{
    public delegate void QueryExecutedEventHandler(object sender, QueryResult result);
    public delegate void QueuedQueryExecutedEventHandler(object sender, QueryResult result);
}
