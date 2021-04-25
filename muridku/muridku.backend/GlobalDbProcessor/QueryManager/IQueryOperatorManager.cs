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
    string EncryptMD5HashFormat { get; }
    string EncryptMD5HashCultureInfo { get; }
    IRequestResult OpenDbConnection();
    IRequestResult ExecuteQuery( QueryRequestParam queryRequestParam, bool isNeedReturnValue = true );
    IRequestResult EnqueueQuery( QueryRequestParam queryRequestParam );
    IRequestResult CloseDbConnection();
  }
}
