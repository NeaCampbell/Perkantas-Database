using System.Collections.Generic;

namespace QueryOperator.QueryExecutor
{
  internal class RawSingleQueryResult
  {
    public bool Succeed { get; set; }
    public string ErrorMessage { get; set; }
    public IDictionary<string, object> RawResult { get; set; }
  }
}
