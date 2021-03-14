using System;

namespace Common
{
  public interface IDbQueryFilter
  {
    string FieldName { get; }
    DbQueryOperator DbOperator { get; }
    string Value { get; }
    Type DataType { get; }
  }
}
