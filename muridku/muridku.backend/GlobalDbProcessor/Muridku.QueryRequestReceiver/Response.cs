using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver
{
  public class Response<TModel> where TModel: class
  {
    public Response( string requestId, string requestCode, bool succeed, string errorMessage, TModel result = null )
    {
      RequestId = requestId;
      RequestCode = requestCode;
      Succeed = succeed;
      ErrorMessage = errorMessage;
      Result = result;
    }

    public string RequestId { get; set; }
    public string RequestCode { get; set; }
    public bool Succeed { get; set; }
    public string ErrorMessage { get; set; }
    public TModel Result { get; set; }
  }
}
