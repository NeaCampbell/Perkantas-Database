using QueryOperator.QueryExecutor;
using System;
using System.Threading.Tasks;

namespace QueryManager
{
    public interface IQueryOperatorManager<TDbServiceType>: IDisposable
    {
        event QueuedQueryHandler OnQueryExecuted;
        IQueryExecutor<TDbServiceType> QueryExecutor { get; }
        bool OpenDbConnection();
        QueryResult ExecuteQuery(QueryRequestParam queryRequestParam);
        bool EnqueueQuery(QueryRequestParam queryRequestParam);
        bool CloseDbConnection();
    }
}
