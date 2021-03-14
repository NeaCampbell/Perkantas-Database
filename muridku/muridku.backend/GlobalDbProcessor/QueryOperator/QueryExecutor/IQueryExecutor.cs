using Common;
using System.Collections.Generic;
using System.Data;

namespace QueryOperator.QueryExecutor
{
    public interface IQueryExecutor
    {
        void AssignConnection(IDbConnection dbConnection);
        QueryResult ExecuteQuery(QueryRequestParam queryRequestParam);
        void ChangeDbTransState(DbTransactionState transState);
    }

    public interface IQueryExecutor<TDbConnection>: IQueryExecutor
    {
        IQueryExecutor<TDbConnection> Clone();
    }
}
