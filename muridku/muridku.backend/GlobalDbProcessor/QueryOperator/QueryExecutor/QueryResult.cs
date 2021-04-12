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

    public string RequestId { get; internal set; }
    public string RequestCode { get; internal set; }
    public bool Succeed { get; internal set; }
    public string ErrorMessage { get; internal set; }
    public string Result { get; internal set; }
  }
}
