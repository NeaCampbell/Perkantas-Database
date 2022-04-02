using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Muridku.QueryRequestReceiver.Models;
using Muridku.QueryRequestReceiver.Models.Dbs;
using Muridku.QueryRequestReceiver.Models.Params;
using QueryManager;
using QueryOperator.QueryExecutor;
using System;
using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailController : QueryControllerBase
    {
        public EmailController(ILogger<QueryControllerBase> logger, IQueryOperatorManager<DbServiceType> queryOperatorManager)
          : base(logger, queryOperatorManager)
        {
        }

        [HttpPost("reset-password")]
        public QueryResult ResetPassword(
            [FromBody] NewForgotPassword param
        )
        {
            LogApi logApi = CreateLogApiObj(GetCurrentMethod(), string.Empty);
            IList<Func<CheckParam>> preCheckFuncs = new List<Func<CheckParam>>
            {
                () => ValidateParamInputString( new Tuple<string, string, int>( "destination", param.destination, 200 ) )
            };

            IList<string> paramQuery = new List<string>()
            {
                param.destination
            };

            QueryResult checkResult = ExecuteRequest<User>(logApi, paramQuery, ConstRequestType.GET,
                QueryListKeyMap.GET_USER_BY_EMAIL, QueryListKeyMap.GET_USER_BY_EMAIL, isSingleRow: true, preCheckFuncs: preCheckFuncs);

            if (!checkResult.Succeed)
                return checkResult;

            User user = GetModelFromQueryResult<User>(checkResult);
            string rawPassword = GlobalHelperController.GeneratePassword(5);
            string newPassword = CipherCentre.EncryptMD5(rawPassword, QueryOperatorManager.EncryptMD5HashFormat, QueryOperatorManager.EncryptMD5HashCultureInfo);

            QueryResult resetResult = ExecuteRequest<User>(logApi, new List<string>() { user.id.ToString(), newPassword }, ConstRequestType.POST,
                QueryListKeyMap.UPDATE_PASSWORD, QueryListKeyMap.UPDATE_PASSWORD, isSingleRow: true);

            if (!resetResult.Succeed)
                return resetResult;

            paramQuery = new List<string>()
            {
                user.id.ToString(),
                user.email,
                "[no-reply] - Reset Password MURIDKU",
                "Password anda telah direset. Password baru: " + rawPassword + "\nJangan balas email ini."
            };

            QueryResult reqResult = ExecuteRequest<Outbox>(logApi, paramQuery, ConstRequestType.POST,
                QueryListKeyMap.SEND_EMAIL, QueryListKeyMap.SEND_EMAIL, isSingleRow: true);

            return reqResult;
        }
    }
}
