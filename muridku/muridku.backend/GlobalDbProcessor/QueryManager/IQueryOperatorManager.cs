using QueryOperator.QueryExecutor;
using System;

namespace QueryManager
{
  public interface IQueryOperatorManager<TDbServiceType> : IDisposable
  {
    event QueryExecutedEventHandler OnQueryExecuted;
    event QueuedQueryExecutedEventHandler OnQueuedQueryExecuted;
    event QueuedQueryCancelledEventHandler OnQueuedQueryCancelled;
    int RequestWaitingTime { get; }
    int MaxRequestTimeout { get; }
    IRequestResult OpenDbConnection();
    IRequestResult ExecuteQuery( QueryRequestParam queryRequestParam );
    IRequestResult EnqueueQuery( QueryRequestParam queryRequestParam );
    IRequestResult CloseDbConnection();
  }
}
