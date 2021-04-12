using Microsoft.AspNetCore.Builder;

namespace Muridku.QueryRequestReceiver.Middleware
{
  public static class MiddlewareExtensions
  {
    public static IApplicationBuilder UseSecurityMiddleware( this IApplicationBuilder app, SecurityMiddlewarePolicyBuilder securityBuilder )
    {
      SecurityHeaderPolicy policy = securityBuilder.Build();
      return app.UseMiddleware<SecurityMiddleware>( policy, securityBuilder.GetToken() );
    }
  }
}
