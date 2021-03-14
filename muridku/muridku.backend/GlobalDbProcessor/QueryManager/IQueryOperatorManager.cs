using QueryOperator.QueryExecutor;
using System;

namespace QueryManager
{
    public interface IQueryOperatorManager<TDbServiceType>: IDisposable
    {
        event QueryExecutedEventHandler OnQueryExecuted;
        event QueuedQueryExecutedEventHandler OnQueuedQueryExecuted;
        IQueryExecutor<TDbServiceType> QueryExecutor { get; }
        bool OpenDbConnection();
        bool ExecuteQuery(QueryRequestParam queryRequestParam);
        bool EnqueueQuery(QueryRequestParam queryRequestParam);
        bool CloseDbConnection();
    }
}
