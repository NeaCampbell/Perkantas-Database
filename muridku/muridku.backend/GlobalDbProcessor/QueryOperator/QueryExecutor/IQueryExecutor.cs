using Common;
using System;
using System.Data;

namespace QueryOperator.QueryExecutor
{
    public interface IQueryExecutor: IDisposable
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
