using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Controllers
{
    public abstract class QueryControllerBase : ControllerBase
    {
        protected ILogger<QueryControllerBase> Logger { get; private set; }
        protected IQueryOperatorManager<DbServiceType> QueryOperatorManager { get; private set; }

        public QueryControllerBase(ILogger<QueryControllerBase> logger
            , IQueryOperatorManager<DbServiceType> queryOperatorManager)
        {
            Logger = logger;
            QueryOperatorManager = queryOperatorManager;
        }

        protected virtual QueryResult ExecuteRequest(IList<string> param, string strProcessType, string requestCode, bool isSingleRow = false)
        {

            ProcessType processType = GetProcessType(strProcessType);

            if (string.IsNullOrEmpty(requestCode))
                return new QueryResult(requestCode, false, "invalid request code");

            string requestId = string.Format("{0}_{1}_{2}", HttpContext.Session.Id, GetType().Name.ToString(), processType);
            Console.WriteLine("request id = {0}", requestId);

            try
            {
                QueryRequestParam reqParam = new QueryRequestParam(processType, requestCode, param, requestId, isSingleRow);
                return QueryOperatorManager.ExecuteQuery(reqParam);
            }
            catch(Exception ex)
            {
                return new QueryResult(requestCode, false, ex.Message);
            }
        }

        protected virtual QueryResult EnqueueRequest(IList<string> param, string strProcessType, string requestCode, bool isSingleRow = false)
        {
            string requestId = string.Format("{0}_{1}_{2}", HttpContext.Session.Id, GetType().Name.ToString(), ProcessType.Select);
            Console.WriteLine("request id = {0}", requestId);

            ProcessType processType = GetProcessType(strProcessType);

            if (string.IsNullOrEmpty(requestCode))
                return new QueryResult(requestCode, false, "invalid request code");

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

        private ProcessType GetProcessType(string requestType)
        {
            switch (requestType.ToLower())
            {
                case "get":
                    return ProcessType.Select;
                case "post":
                    return ProcessType.Insert;
                case "put":
                    return ProcessType.Update;
                case "delete":
                    return ProcessType.Delete;
                default:
                    return default(ProcessType);
            }
        }
    }
}
