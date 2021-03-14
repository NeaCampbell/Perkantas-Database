namespace Common
{
  public interface IConverter<TConvertSource, TConvertDest> where TConvertSource : class where TConvertDest : class
  {
    TConvertDest DoConvert( TConvertSource source );
  }
}
