namespace QueryOperator.QueryExecutor
{
  public class QueryResult
  {
    public QueryResult()
    {

    }

    public QueryResult( string requestId, string requestCode, bool succeed, string errorMessage, string result = null )
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
    public string Result { get; set; }
  }
}
