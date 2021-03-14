using Common;
using QueryOperator.Builder.Connection;
using QueryOperator.Builder.QueryExecutor;
using QueryOperator.QueryExecutor;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace QueryManager
{
    public class QueryOperatorManager : IQueryOperatorManager<DbServiceType>
    {
        public IQueryExecutor<DbServiceType> QueryExecutor { get; private set; }
        public event QueuedQueryHandler OnQueryExecuted;

        private readonly IDbConnection _dbConnection;
        private readonly IQueryExecutor _queryExecutor;
        private Queue _queueRequest;
        private readonly IList<Task> _queryTasks;
        private readonly object _lockObject;
        private readonly Thread _queryTaskWatcher;
        private bool _shouldWatcherActive;

        public QueryOperatorManager(DbServiceType dbServiceType, string connectionString, IConfigSource dbConfigSource, int threadCount)
        {
            IDbConnectionBuilder<DbServiceType> connBuilder = new DbConnectionBuilder(dbServiceType, connectionString);
            IQueryExecutorBuilder<DbServiceType> queryBuilder = new QueryExecutorBuilder(dbServiceType, dbConfigSource);
            Console.WriteLine(connectionString);
            _dbConnection = connBuilder.Build();
            _queryExecutor = queryBuilder.Build();
            _queryExecutor.AssignConnection(_dbConnection);
            _queueRequest = new Queue();
            _queryTasks = new List<Task>();

            for (int i = 0; i < threadCount; i++)
                _queryTasks.Add(new Task(() => ExecuteQueuedQuery()));

            _lockObject = new object();
            _queryTaskWatcher = new Thread(() => MonitorQueryTask());
        }

        private void MonitorQueryTask()
        {
            while(_shouldWatcherActive)
            {
                Queue tempQueue;

                lock (_lockObject)
                    tempQueue = Queue.Synchronized(_queueRequest);

                if(tempQueue.Count > 0)
                {
                    bool freeTaskFound = false;
                    int taskId = 0;

                    while(!freeTaskFound && taskId < _queryTasks.Count)
                    {
                        freeTaskFound = _queryTasks[taskId].Status != TaskStatus.Running;

                        if(!freeTaskFound)
                            taskId++;
                    }

                    Console.WriteLine("task Id = {0}", taskId);

                    if (taskId < _queryTasks.Count)
                    {
                        try
                        {
                            _queryTasks[taskId] = new Task(() => ExecuteQueuedQuery());
                            _queryTasks[taskId].Start();
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine("Error! {0}", e.Message);
                        }
                    }
                }

                Thread.Sleep(500);
            }
        }

        private void ExecuteQueuedQuery()
        {
            try
            {
                QueryRequestParam reqParam;

                lock (_lockObject)
                {
                    Queue tempQueue = Queue.Synchronized(_queueRequest);
                    reqParam = tempQueue.Dequeue() as QueryRequestParam;
                }

                QueryResult result = _queryExecutor.ExecuteQuery(reqParam);
                OnQueryExecuted?.Invoke(this, result);
                Console.WriteLine("Query executed");
            }
            catch(Exception e)
            {
                Console.WriteLine("Error! {0}", e.Message);
            }
        }

        public bool OpenDbConnection()
        {
            try
            {
                _dbConnection.Open();
                _shouldWatcherActive = true;
                _queryTaskWatcher.Start();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public QueryResult ExecuteQuery(QueryRequestParam queryRequestParam)
        {
            try
            {
                return _queryExecutor.ExecuteQuery(queryRequestParam);
            }
            catch
            {
                return null;
            }
        }

        public bool EnqueueQuery(QueryRequestParam queryRequestParam)
        {
            try
            {
                lock (_lockObject)
                {
                    _queueRequest = Queue.Synchronized(_queueRequest);
                    _queueRequest.Enqueue(queryRequestParam);
                }
                Console.WriteLine("Query Enqueued!");
                return true;
            }
            catch
            {
                return false;
            }

        }

        public bool CloseDbConnection()
        {
            try
            {
                _shouldWatcherActive = false;
                _queryTaskWatcher.Join();

                while (_queueRequest.Count > 0)
                    _queueRequest.Dequeue();

                if (_dbConnection.State == ConnectionState.Open)
                    _dbConnection.Close();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Dispose()
        {
            if(_dbConnection != null)
                _dbConnection.Dispose();
        }
    }
}
