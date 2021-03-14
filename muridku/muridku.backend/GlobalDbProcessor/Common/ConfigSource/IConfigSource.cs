using System.Collections.Generic;

namespace Common.ConfigSource
{
  public interface IConfigSource
  {
    void SetValue<TValue>( string configName, TValue value );
    TValue GetValue<TValue>( string configName, TValue defaultValue );
    IList<TValue> GetValues<TValue>( IList<string> configNames, IList<TValue> defaultValues );
  }
}
