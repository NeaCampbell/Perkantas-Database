using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models;
using Newtonsoft.Json;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : QueryControllerBase
    {
        private const string _getAllUserAddr = "getalluser";
        private const string _validateUserAddr = "validateuser";
        private QueryResult _queryResult;

        public UserController(ILogger<UserController> logger
            , IQueryOperatorManager<DbServiceType> queryOperatorManager):
            base(logger, queryOperatorManager)
        {
        }

        protected override void OnQueuedQueryExecutedHandler(object sender, QueryResult result)
        {
            base.OnQueuedQueryExecutedHandler(sender, result);
            _queryResult = result;

            switch (result.RequestCode)
            {
                case _getAllUserAddr:
                    Console.WriteLine("    Query Result = {0}", _queryResult.Result);
                    break;
                default:
                    break;
            }
        }

        [HttpGet(_getAllUserAddr)]
        public QueryResult GetAllUser()
        {
            return EnqueueRequest(null, ConstRequestType.GET, _getAllUserAddr);
        }

        [HttpGet(_validateUserAddr)]
        public async Task<QueryResult> ValidateUser(string email, string password)
        {
            _queryResult = null;
            string invalidMsg = "invalid email or password";

            if (email.Replace(" ", "") != email)
                return new QueryResult(_validateUserAddr, false, invalidMsg);

            QueryResult reqResult = await ExecuteRequest(new List<string>() { email }, ConstRequestType.GET, _validateUserAddr);

            if (!reqResult.Succeed)
                return reqResult;

            Console.WriteLine("    Query Result = {0}", reqResult.Result);

            if(string.IsNullOrEmpty(reqResult.Result))
                return new QueryResult(_validateUserAddr, false, invalidMsg);

            User user = JsonConvert.DeserializeObject<IList<User>>(reqResult.Result)[0];

            if (user.password != password)
                return new QueryResult(_validateUserAddr, false, invalidMsg);

            user.password = null;
            return new QueryResult(reqResult.RequestCode, reqResult.Succeed, reqResult.ErrorMessage, JsonConvert.SerializeObject(user));
        }
    }
}
