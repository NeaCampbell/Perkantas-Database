namespace Common.ConfigSource
{
  public static class ConfigSourceBuilder
  {
    public static IConfigSource BuildFileConfigSource( string fileName, ConfigFileType fileType )
    {
      return new FileConfigSource( fileName, fileType );
    }
  }
}
