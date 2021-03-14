using System.Collections.Generic;

namespace QueryOperator.QueryExecutor
{
    internal class RawQueryResult
    {
        public bool Succeed { get; set; }
        public string ErrorMessage { get; set; }
        public IList<IDictionary<string, object>> RawResult { get; set; }
    }
}
