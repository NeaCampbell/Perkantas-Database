using System;

namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class LogApi
  {
    public LogApi()
    {
      response_status = 200;
      param_output = string.Empty;
      error_message = string.Empty;
    }

    public long id { get; set; }
    public string request_id { get; set; }
    public string url { get; set; }
    public string method_name { get; set; }
    public string param_input { get; set; }
    public int response_status { get; set; }
    public string param_output { get; set; }
    public string error_message { get; set; }
    public string usr_crt { get; set; }
    public DateTime dtm_crt { get; set; }
  }
}
