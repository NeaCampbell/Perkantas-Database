using Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace QueryOperator.QueryExecutor
{
  public class QueryRequestParam
  {
    public QueryRequestParam( ProcessType processType, string requestCode, IList<string> requestParam, string uuid, bool isSingleRow = false )
    {
      ProcessType = processType;
      RequestCode = requestCode;
      RequestParam = requestParam;
      Uuid = uuid;
      IsSingleRow = isSingleRow;
    }

    public ProcessType ProcessType { get; private set; }
    public string RequestCode { get; private set; }
    public IList<string> RequestParam { get; private set; }
    public string Uuid { get; private set; }
    public bool IsSingleRow { get; private set; }
  }
}
