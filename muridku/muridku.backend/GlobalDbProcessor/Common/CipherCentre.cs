using System.Globalization;
using System.Security.Cryptography;
using System.Text;

namespace Common
{
  public static class CipherCentre
  {
    public static string EncryptMD5( string decryptedValue, string hashFormat, string hashCultureInfo )
    {
      if( string.IsNullOrEmpty( decryptedValue ) )
        return null;

      byte[] tmpSource = Encoding.ASCII.GetBytes( decryptedValue );
      byte[] tmpHash = new MD5CryptoServiceProvider().ComputeHash( tmpSource );
      StringBuilder sOutput = new StringBuilder( tmpHash.Length );
      CultureInfo cultureInfo = new CultureInfo( hashCultureInfo );

      for( int i = 0; i < tmpHash.Length; i++ )
        sOutput.Append( tmpHash[ i ].ToString( hashFormat, cultureInfo ) );

      return sOutput.ToString();
    }
  }
}
