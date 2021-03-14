using Common;
using MySqlConnector;
using QueryOperator.QueryExecutor;
using QueryOperator.QueryExecutor.MySQL;
using QueryOperator.QueryExecutor.PgSQL;
using System.Data;

namespace QueryOperator.Builder.QueryExecutor
{
    public class QueryExecutorBuilder : IQueryExecutorBuilder<DbServiceType>
    {
        private IConfigSource _dbConfigSource;
        private DbServiceType _dbServiceType;

        public QueryExecutorBuilder(DbServiceType dbServiceType, IConfigSource dbConfigSource)
        {
            _dbServiceType = dbServiceType;
            _dbConfigSource = dbConfigSource;
        }

        public IQueryExecutor Build()
        {
            switch(_dbServiceType)
            {
                case DbServiceType.MySql:
                    return new MySQLQueryExecutor(_dbConfigSource);
                case DbServiceType.PostgreSql:
                    return new PgSQLQueryExecutor(_dbConfigSource);
                default:
                    return null;
            }
        }
    }
}
