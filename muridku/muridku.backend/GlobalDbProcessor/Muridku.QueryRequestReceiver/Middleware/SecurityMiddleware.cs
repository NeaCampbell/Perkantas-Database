using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Middleware
{
  public class SecurityMiddleware : IMiddleware
  {
    private class InvalidRequestMessage
    {
      public int ErrorCode { get; set; }
      public string ErrorMessage { get; set; }
    }

    private readonly RequestDelegate _next;
    private readonly SecurityHeaderPolicy _policy;
    private readonly string _token;
    private const string _tokenHeaderName = "Token";

    public SecurityMiddleware( RequestDelegate next, SecurityHeaderPolicy policy, string token )
    {
      _next = next;
      _policy = policy;
      _token = token;
      Console.WriteLine( "security generated, token = {0}", _token );
    }

    public async Task Invoke( HttpContext context )
    {
      IHeaderDictionary requestHeaders = context.Request.Headers;
      IHeaderDictionary responseHeaders = context.Response.Headers;
      InvalidRequestMessage reqMessage = new InvalidRequestMessage();

      if( !requestHeaders.ContainsKey( _tokenHeaderName ) )
      {
        context.Response.StatusCode = 400;
        reqMessage.ErrorCode = 400;
        reqMessage.ErrorMessage = "token not provided!";
        await context.Response.WriteAsync( JsonConvert.SerializeObject( reqMessage ) );
        return;
      }

      if( requestHeaders[ _tokenHeaderName ] != _token )
      {
        context.Response.StatusCode = 400;
        reqMessage.ErrorCode = 400;
        reqMessage.ErrorMessage = "invalid token!";
        await context.Response.WriteAsync( JsonConvert.SerializeObject( reqMessage ) );
        return;
      }

      foreach( KeyValuePair<string, string> headerValuePair in _policy.SetHeaders )
        responseHeaders[ headerValuePair.Key ] = headerValuePair.Value;

      foreach( string header in _policy.RemovedHeaders )
        responseHeaders.Remove( header );

      await _next( context );
    }
  }
}
