using QueryOperator.QueryExecutor;

namespace QueryOperator.Builder.QueryExecutor
{
    public interface IQueryExecutorBuilder<TDbServiceType>
    {
        IQueryExecutor Build();
    }
}
