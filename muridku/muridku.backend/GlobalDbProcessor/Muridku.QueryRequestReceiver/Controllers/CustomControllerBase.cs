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
        protected string RequestId { get; private set; }

        private readonly object _lockObject;
        private QueryResult _queryResult;
        private readonly int _requestWaitingTime;

        public QueryControllerBase(ILogger<QueryControllerBase> logger
            , IQueryOperatorManager<DbServiceType> queryOperatorManager)
        {
            Logger = logger;
            QueryOperatorManager = queryOperatorManager;
            _requestWaitingTime = queryOperatorManager.RequestWaitingTime;
            _lockObject = new object();
        }

        protected async virtual Task<QueryResult> ExecuteRequest(IList<string> param, string strProcessType, string requestCode, bool isSingleRow = false)
        {
            ProcessType processType = GetProcessType(strProcessType);
            RequestId = string.Format("{0}_{1}_{2}", HttpContext.Session.Id, GetType().Name.ToString(), processType);

            if (string.IsNullOrEmpty(requestCode))
                return new QueryResult(RequestId, requestCode, false, "invalid request code");

            Console.WriteLine();
            Console.WriteLine("================");
            Console.WriteLine("request id = {0}", RequestId);
            QueryOperatorManager.OnQueryExecuted += OnQueryExecutedHandler;

            try
            {
                QueryRequestParam reqParam = new QueryRequestParam(processType, requestCode, param, RequestId, isSingleRow);

                IRequestResult reqResult = QueryOperatorManager.ExecuteQuery(reqParam);

                if (!reqResult.Result)
                    return new QueryResult(RequestId, requestCode, false, reqResult.Message);

                await Task.Run(() =>
                {
                    while (_queryResult == null)
                        Thread.Sleep(_requestWaitingTime);
                });

                return _queryResult;
            }
            catch(Exception ex)
            {
                return new QueryResult(RequestId, requestCode, false, ex.Message);
            }
            finally
            {
                QueryOperatorManager.OnQueryExecuted -= OnQueryExecutedHandler;
            }
        }

        protected virtual QueryResult EnqueueRequest(IList<string> param, string strProcessType, string requestCode, bool isSingleRow = false)
        {
            ProcessType processType = GetProcessType(strProcessType);
            RequestId = string.Format("{0}_{1}_{2}", HttpContext.Session.Id, GetType().Name.ToString(), ProcessType.Select);

            if (string.IsNullOrEmpty(requestCode))
                return new QueryResult(RequestId, requestCode, false, "invalid request code");

            Console.WriteLine();
            Console.WriteLine("================");
            Console.WriteLine("request id = {0}", RequestId);
            QueryOperatorManager.OnQueuedQueryExecuted += OnQueuedQueryExecutedHandler;

            try
            {
                QueryRequestParam reqParam = new QueryRequestParam(processType, requestCode, param, RequestId, isSingleRow);
                IRequestResult reqResult = QueryOperatorManager.EnqueueQuery(reqParam);

                if (!reqResult.Result)
                    return new QueryResult(RequestId, requestCode, false, reqResult.Message);

                return new QueryResult(RequestId, requestCode, true, "");
            }
            catch (Exception ex)
            {
                return new QueryResult(RequestId, requestCode, false, ex.Message);
            }
        }

        private void OnQueryExecutedHandler(object sender, QueryResult result)
        {
            if (RequestId == result.RequestId)
            {
                QueryOperatorManager.OnQueryExecuted -= OnQueryExecutedHandler;

                lock (_lockObject)
                    _queryResult = result;
            }
        }

        protected virtual void OnQueuedQueryExecutedHandler(object sender, QueryResult result)
        {
            if(RequestId == result.RequestId)
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
                    return default;
            }
        }
    }
}
