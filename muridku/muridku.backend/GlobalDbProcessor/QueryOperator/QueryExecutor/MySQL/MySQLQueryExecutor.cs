using Common;
using Common.ConfigSource;
using MySqlConnector;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading;

namespace QueryOperator.QueryExecutor.MySQL
{
    internal class MySQLQueryExecutor : IQueryExecutor<MySqlConnection>
    {
        private MySqlConnection _dbConnection;
        private readonly IConfigSource _dbConfigSource;
        private readonly IConfigSource _queryConfigSource;
        private readonly string _dbName;
        private MySqlTransaction _transaction;

        public MySQLQueryExecutor( IConfigSource dbConfigSource )
        {
            _dbConfigSource = dbConfigSource;
            _dbName = dbConfigSource.GetValue("DbName", string.Empty);
            string queryPath = dbConfigSource.GetValue( "QueryPath", string.Empty );

            if( queryPath.Equals( string.Empty ) )
                throw new Exception( "Cannot execute query. Query list path is not found." );

            _queryConfigSource = ConfigSourceBuilder.BuildFileConfigSource( queryPath, ConfigFileType.Xml );
        }

        private RawQueryResult ExecuteQuerySimple( string query, ProcessType processType, string uuid )
        {
            MySqlCommand command;
            IList<IDictionary<string, object>> selectResult = null;

            try
            {
                command = new MySqlCommand( query, _dbConnection );

                switch( processType )
                {
                    case ProcessType.Select:
                        command.ExecuteNonQuery();
                        command.CommandType = CommandType.Text;
                        MySqlDataReader dr = command.ExecuteReader();
            
                        while( dr.Read() )
                        {
                            if( selectResult == null )
                            selectResult = new List<IDictionary<string, object>>();

                            IDictionary<string, object> row = new Dictionary<string, object>();

                            for( int i = 0; i < dr.FieldCount; i++ )
                            row.Add( dr.GetName( i ), dr.GetValue( i ) );

                            selectResult.Add( row );
                        }
                        dr.Close();

                        break;
                    default:
                        command.ExecuteNonQuery();
                        break;
                }
            }
            catch( Exception e )
            {
                return new RawQueryResult()
                {
                    Succeed = false,
                    ErrorMessage = e.Message,
                    RawResult = selectResult
                };
            }

            return new RawQueryResult()
            {
                Succeed = true,
                ErrorMessage = string.Empty,
                RawResult = selectResult
            };
        }

        private RawSingleQueryResult ExecuteSingleQuerySimple( string query, ProcessType processType, string uuid )
        {
            MySqlCommand command;
            IDictionary<string, object> selectResult = null;

            try
            {
                command = new MySqlCommand( query, _dbConnection );

                switch( processType )
                {
                    case ProcessType.Select:
                        command.ExecuteNonQuery();
                        command.CommandType = CommandType.Text;
                        MySqlDataReader dr = command.ExecuteReader();

                        while( dr.Read() )
                        {
                            selectResult = new Dictionary<string, object>();

                            for( int i = 0; i < dr.FieldCount; i++ )
                            selectResult.Add( dr.GetName( i ), dr.GetValue( i ) );

                            break;
                        }
                        dr.Close();

                        break;
                    default:
                        command.ExecuteNonQuery();
                        break;
                }
            }
            catch( Exception e )
            {
                return new RawSingleQueryResult()
                {
                    Succeed = false,
                    ErrorMessage = e.Message,
                    RawResult = selectResult
                };
            }

            return new RawSingleQueryResult()
            {
                Succeed = true,
                ErrorMessage = string.Empty,
                RawResult = selectResult
            };
        }

        public void AssignConnection( IDbConnection dbConnection )
        {
            _dbConnection = dbConnection as MySqlConnection;
        }

        public QueryResult ExecuteQuery(QueryRequestParam queryRequestParam)
        {
            string query;

            if (queryRequestParam.RequestParam != null && queryRequestParam.RequestParam.Count > 0)
            {
                string compiledRequestParam = string.Empty;

                foreach (string param in queryRequestParam.RequestParam)
                    compiledRequestParam += string.Format("{0}'{1}'", (compiledRequestParam != string.Empty ? ", " : string.Empty), param);

                query = string.Format(
                                        "CALL `{0}`.`{1}`({2});",
                                        _dbName,
                                        _queryConfigSource.GetValue(queryRequestParam.RequestCode, string.Empty),
                                        compiledRequestParam
                                        );
            }
            else
                query = string.Format(
                                        "CALL `{0}`.`{1}`();",
                                        _dbName,
                                        _queryConfigSource.GetValue(queryRequestParam.RequestCode, string.Empty)
                                        );

            Console.WriteLine("    [{0}] query: {1}", Thread.CurrentThread.ManagedThreadId, query);

            if (!queryRequestParam.IsSingleRow)
            {
                RawQueryResult result = ExecuteQuerySimple(query, queryRequestParam.ProcessType, queryRequestParam.Uuid);

                if (result.RawResult != null && result.RawResult.Count > 0)
                    return new QueryResult()
                    {
                        RequestCode = queryRequestParam.RequestCode,
                        Succeed = result.Succeed,
                        ErrorMessage = result.ErrorMessage,
                        Result = JsonConvert.SerializeObject(result.RawResult)
                    };

                return new QueryResult()
                {
                    RequestCode = queryRequestParam.RequestCode,
                    Succeed = result.Succeed,
                    ErrorMessage = result.ErrorMessage,
                    Result = JsonConvert.SerializeObject(new object())
                };
            }

            RawSingleQueryResult singleResult = ExecuteSingleQuerySimple(query, queryRequestParam.ProcessType, queryRequestParam.Uuid);

            if (singleResult.RawResult != null && singleResult.RawResult.Count > 0)
                return new QueryResult()
                {
                    RequestCode = queryRequestParam.RequestCode,
                    Succeed = singleResult.Succeed,
                    ErrorMessage = singleResult.ErrorMessage,
                    Result = JsonConvert.SerializeObject(singleResult.RawResult)
                };

            return new QueryResult()
            {
                RequestCode = queryRequestParam.RequestCode,
                Succeed = singleResult.Succeed,
                ErrorMessage = singleResult.ErrorMessage,
                Result = JsonConvert.SerializeObject(new object())
            };
        }

        public void ChangeDbTransState( DbTransactionState transState )
        {
            switch ( transState )
            {
                case DbTransactionState.Open:
                    _dbConnection.Open();
                    break;
                case DbTransactionState.Start:
                    _transaction = _dbConnection.BeginTransaction();
                    break;
                case DbTransactionState.Commit:
                    _transaction.Commit();
                    break;
                case DbTransactionState.Rollback:
                    _transaction.Rollback();
                    break;
                case DbTransactionState.Close:
                    _dbConnection.Close();
                    break;
                default:
                    break;
            }
        }

        public IQueryExecutor<MySqlConnection> Clone()
        {
            return new MySQLQueryExecutor( _dbConfigSource );
        }
    }
}
