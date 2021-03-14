using Common;
using MySqlConnector;
using Npgsql;
using System.Data;

namespace QueryOperator.Builder.Connection
{
    public class DbConnectionBuilder : IDbConnectionBuilder<DbServiceType>
    {
        private DbServiceType _dbServiceType;
        private string _connectionString;

        public DbConnectionBuilder(DbServiceType dbServiceType, string connectionString)
        {
            _dbServiceType = dbServiceType;
            _connectionString = connectionString;
        }

        public IDbConnection Build()
        {
            switch(_dbServiceType)
            {
                case DbServiceType.MySql:
                    return new MySqlConnection(_connectionString);
                case DbServiceType.PostgreSql:
                    return new NpgsqlConnection(_connectionString);
                default:
                    return null;
            }
        }
    }
}
