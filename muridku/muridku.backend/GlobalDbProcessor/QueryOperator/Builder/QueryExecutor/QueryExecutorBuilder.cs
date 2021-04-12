using Common;
using Common.ConfigSource;
using QueryOperator.QueryExecutor;
using QueryOperator.QueryExecutor.MySQL;
using QueryOperator.QueryExecutor.PgSQL;

namespace QueryOperator.Builder.QueryExecutor
{
  public class QueryExecutorBuilder : IQueryExecutorBuilder<DbServiceType>
  {
    private IConfigSource _dbConfigSource;
    private DbServiceType _dbServiceType;

    public QueryExecutorBuilder( DbServiceType dbServiceType, IConfigSource dbConfigSource )
    {
      _dbServiceType = dbServiceType;
      _dbConfigSource = dbConfigSource;
    }

    public IQueryExecutor Build()
    {
      switch( _dbServiceType )
      {
        case DbServiceType.MySql:
          return new MySQLQueryExecutor( _dbConfigSource );
        case DbServiceType.PostgreSql:
          return new PgSQLQueryExecutor( _dbConfigSource );
        default:
          return null;
      }
    }
  }
}
