using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Controllers
{
    public abstract class QueryControllerBase : ControllerBase
    {
        protected ILogger<QueryControllerBase> Logger { get; private set; }
        protected IQueryOperatorManager<DbServiceType> QueryOperatorManager { get; private set; }

        private readonly object _lockObject;
        private QueryResult _queryResult;
        private const int _queryExecutionWaitingTime = 10;

        public QueryControllerBase(ILogger<QueryControllerBase> logger
            , IQueryOperatorManager<DbServiceType> queryOperatorManager)
        {
            Logger = logger;
            QueryOperatorManager = queryOperatorManager;
            _lockObject = new object();
        }

        protected async virtual Task<QueryResult> ExecuteRequest(IList<string> param, string strProcessType, string requestCode, bool isSingleRow = false)
        {
            ProcessType processType = GetProcessType(strProcessType);

            if (string.IsNullOrEmpty(requestCode))
                return new QueryResult(requestCode, false, "invalid request code");

            string requestId = string.Format("{0}_{1}_{2}", HttpContext.Session.Id, GetType().Name.ToString(), processType);
            Console.WriteLine();
            Console.WriteLine("================");
            Console.WriteLine("request id = {0}", requestId);
            QueryOperatorManager.OnQueryExecuted += OnQueryExecutedHandler;

            try
            {
                QueryRequestParam reqParam = new QueryRequestParam(processType, requestCode, param, requestId, isSingleRow);
                if (!QueryOperatorManager.ExecuteQuery(reqParam))
                    return new QueryResult(requestCode, false, "internal server error");

                await Task.Run(() =>
                {
                    while (_queryResult == null)
                        Thread.Sleep(_queryExecutionWaitingTime);
                });

                return _queryResult;
            }
            catch(Exception ex)
            {
                return new QueryResult(requestCode, false, ex.Message);
            }
            finally
            {
                QueryOperatorManager.OnQueryExecuted -= OnQueryExecutedHandler;
            }
        }

        protected virtual QueryResult EnqueueRequest(IList<string> param, string strProcessType, string requestCode, bool isSingleRow = false)
        {
            ProcessType processType = GetProcessType(strProcessType);

            if (string.IsNullOrEmpty(requestCode))
                return new QueryResult(requestCode, false, "invalid request code");

            string requestId = string.Format("{0}_{1}_{2}", HttpContext.Session.Id, GetType().Name.ToString(), ProcessType.Select);
            Console.WriteLine();
            Console.WriteLine("================");
            Console.WriteLine("request id = {0}", requestId);
            QueryOperatorManager.OnQueuedQueryExecuted += OnQueuedQueryExecutedHandler;

            try
            {
                QueryRequestParam reqParam = new QueryRequestParam(processType, requestCode, param, requestId, isSingleRow);

                if (QueryOperatorManager.EnqueueQuery(reqParam))
                    return new QueryResult(requestCode, true, "");

                return new QueryResult(requestCode, false, "request failed!");
            }
            catch (Exception ex)
            {
                return new QueryResult(requestCode, false, ex.Message);
            }
        }

        private void OnQueryExecutedHandler(object sender, QueryResult result)
        {
            QueryOperatorManager.OnQueryExecuted -= OnQueryExecutedHandler;

            lock (_lockObject)
                _queryResult = result;
        }

        protected virtual void OnQueuedQueryExecutedHandler(object sender, QueryResult result)
        {
            QueryOperatorManager.OnQueuedQueryExecuted -= OnQueuedQueryExecutedHandler;
        }

        private ProcessType GetProcessType(string requestType)
        {
            switch (requestType.ToLower())
            {
                case ConstRequestType.GET:
                    return ProcessType.Select;
                case ConstRequestType.POST:
                    return ProcessType.Insert;
                case ConstRequestType.PUT:
                    return ProcessType.Update;
                case ConstRequestType.DELETE:
                    return ProcessType.Delete;
                default:
                    return default(ProcessType);
            }
        }
    }
}
