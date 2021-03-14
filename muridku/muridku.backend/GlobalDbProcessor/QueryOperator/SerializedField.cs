using System;
using System.Runtime.Serialization;

namespace QueryOperator
{
  [Serializable]
  [DataContract]
  public class SerializedField
  {
    [DataMember]
    public string FieldName { get; set; }
    public string TypeReferenceName { get; set; }
    [DataMember]
    public string Value { get; set; }
  }
}
