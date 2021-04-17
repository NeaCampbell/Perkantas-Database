using System;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;

namespace Muridku.QueryRequestReceiver.Middleware
{
  public class SecurityMiddlewarePolicyBuilder
  {
    private readonly SecurityHeaderPolicy _policy = new SecurityHeaderPolicy();
    private const string _tokenHeaderName = "Token";
    private string _token;

    public SecurityMiddlewarePolicyBuilder AddDefaultSecurePolicy()
    {
      return this;
    }

    public SecurityMiddlewarePolicyBuilder AddTokenHeader( string decryptedValue, string hashFormat, string hashCultureInfo )
    {
      Console.WriteLine( "Generating global token..." );
      _token = EncryptToken( decryptedValue, hashFormat, hashCultureInfo );
      _policy.SetHeaders[ _tokenHeaderName ] = _token;
      Console.WriteLine( "Global token generated ({0}).", _token );
      return this;
    }

    public string GetToken()
    {
      return _token;
    }

    public SecurityMiddlewarePolicyBuilder AddCustomHeader( string header, string value )
    {
      _policy.SetHeaders[ header ] = value;
      return this;
    }

    public SecurityMiddlewarePolicyBuilder RemoveHeader( string header )
    {
      _policy.RemovedHeaders.Add( header );
      return this;
    }

    public SecurityHeaderPolicy Build()
    {
      return _policy;
    }

    private string EncryptToken( string decryptedValue, string hashFormat, string hashCultureInfo )
    {
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
