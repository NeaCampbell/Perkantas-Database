using Common;
using Common.ConfigSource;
using Newtonsoft.Json;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading;

namespace QueryOperator.QueryExecutor.PgSQL
{
    internal class PgSQLQueryExecutor : IQueryExecutor<NpgsqlConnection>
    {
        private NpgsqlConnection _dbConnection;
        private readonly IConfigSource _dbConfigSource;
        private readonly IConfigSource _queryConfigSource;
        private NpgsqlTransaction _transaction;

        public PgSQLQueryExecutor( IConfigSource dbConfigSource )
        {
            _dbConfigSource = dbConfigSource;
            string queryPath = dbConfigSource.GetValue( "QueryPath", string.Empty );

            if( queryPath.Equals( string.Empty ) )
                throw new Exception( "Cannot execute query. Query list path is not found." );

            _queryConfigSource = ConfigSourceBuilder.BuildFileConfigSource( queryPath, ConfigFileType.Xml );
        }

        private RawQueryResult ExecuteQuerySimple( string query, ProcessType processType, string uuid )
        {
            NpgsqlCommand command;
            IList<IDictionary<string, object>> selectResult = null;

            try
            {
                command = new NpgsqlCommand( query, _dbConnection, _transaction );

                switch( processType )
                {
                    case ProcessType.Select:
                        command.ExecuteNonQuery();
                        command.CommandText = string.Format( "FETCH ALL IN \"{0}\";", uuid );
                        command.CommandType = CommandType.Text;
                        NpgsqlDataReader dr = command.ExecuteReader();
            
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
            NpgsqlCommand command;
            IDictionary<string, object> selectResult = null;

            try
            {
                command = new NpgsqlCommand( query, _dbConnection, _transaction);

                switch( processType )
                {
                    case ProcessType.Select:
                        command.ExecuteNonQuery();
                        command.CommandText = string.Format( "FETCH ALL IN \"{0}\";", uuid );
                        command.CommandType = CommandType.Text;
                        NpgsqlDataReader dr = command.ExecuteReader();

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
                return new RawSingleQueryResult() {
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

        public void AssignConnection(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection as NpgsqlConnection;
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
                                        "SELECT \"{0}\"({1}, '{2}');",
                                        _queryConfigSource.GetValue(queryRequestParam.RequestCode, string.Empty),
                                        compiledRequestParam,
                                        queryRequestParam.Uuid
                                        );
            }
            else
                query = string.Format(
                                        "SELECT \"{0}\"('{1}');",
                                        _queryConfigSource.GetValue(queryRequestParam.RequestCode, string.Empty),
                                        queryRequestParam.Uuid
                                        );

            Console.WriteLine("    [{0}] query: {1}", Thread.CurrentThread.ManagedThreadId, query);

            if (!queryRequestParam.IsSingleRow)
            {
                RawQueryResult result = ExecuteQuerySimple(query, queryRequestParam.ProcessType, queryRequestParam.Uuid);

                if (result.RawResult != null && result.RawResult.Count > 0)
                    return new QueryResult()
                    {
                        RequestId = queryRequestParam.Uuid,
                        RequestCode = queryRequestParam.RequestCode,
                        Succeed = result.Succeed,
                        ErrorMessage = result.ErrorMessage,
                        Result = JsonConvert.SerializeObject(result.RawResult)
                    };

                return new QueryResult()
                {
                    RequestId = queryRequestParam.Uuid,
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
                    RequestId = queryRequestParam.Uuid,
                    RequestCode = queryRequestParam.RequestCode,
                    Succeed = singleResult.Succeed,
                    ErrorMessage = singleResult.ErrorMessage,
                    Result = JsonConvert.SerializeObject(singleResult.RawResult)
                };

            return new QueryResult()
            {
                RequestId = queryRequestParam.Uuid,
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

        public IQueryExecutor<NpgsqlConnection> Clone()
        {
            return new PgSQLQueryExecutor( _dbConfigSource );
        }

        public void Dispose()
        {
            if (_transaction != null)
                _transaction.Dispose();

            if (_dbConnection != null)
                _dbConnection.Dispose();
        }
    }
}
