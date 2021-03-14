using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models;
using Newtonsoft.Json;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : QueryControllerBase
    {
        private const string _validateUserAddr = "validateuser";

        public UserController(ILogger<UserController> logger
            , IQueryOperatorManager<DbServiceType> queryOperatorManager):
            base(logger, queryOperatorManager)
        {
        }

        [HttpGet(_validateUserAddr)]
        public QueryResult ValidateUser(string email, string password)
        {
            QueryResult reqResult = ExecuteRequest(new List<string>() { email }, ConstRequestType.GET, _validateUserAddr);

            if (!reqResult.Succeed)
                return reqResult;

            if(string.IsNullOrEmpty(reqResult.Result))
                return new QueryResult(_validateUserAddr, false, "invalid username or password");

            User user = JsonConvert.DeserializeObject<IList<User>>(reqResult.Result)[0];

            if (user.password != password)
                return new QueryResult(_validateUserAddr, false, "invalid username or password");

            return new QueryResult(reqResult.RequestCode, reqResult.Succeed, reqResult.ErrorMessage, JsonConvert.SerializeObject(user));
        }
    }
}
