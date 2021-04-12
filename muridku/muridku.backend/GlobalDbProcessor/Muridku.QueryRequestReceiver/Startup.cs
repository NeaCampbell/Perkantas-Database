using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Muridku.QueryRequestReceiver.Middleware;
using System;

namespace Muridku.QueryRequestReceiver
{
  public class Startup
  {
    private readonly string _headerToken;
    private readonly string _hashFormat;
    private readonly string _hashCultureInfo;

    public Startup( IConfiguration configuration )
    {
      Configuration = configuration;
      _headerToken = Configuration.GetValue<string>( "HeaderToken" );
      _hashFormat = Configuration.GetValue<string>( "HashFormat" );
      _hashCultureInfo = Configuration.GetValue<string>( "HashCultureInfo" );
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices( IServiceCollection services )
    {
      services.AddDistributedMemoryCache();

      services.AddSession( options =>
       {
        // Set a short timeout for easy testing.
        options.IdleTimeout = TimeSpan.FromMinutes( 10 );
         options.Cookie.HttpOnly = true;
        // Make the session cookie essential
        options.Cookie.IsEssential = true;
       } );

      services.AddCors( options =>
       {
         options.AddDefaultPolicy( builder =>
         {
           builder.WithOrigins( "*" )
           .AllowAnyMethod()
           .AllowAnyHeader();
         } );
       } );

      services.AddControllers();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure( IApplicationBuilder app, IWebHostEnvironment env )
    {
      if( env.IsDevelopment() )
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseSecurityMiddleware( new SecurityMiddlewarePolicyBuilder()
        .AddDefaultSecurePolicy()
        .AddTokenHeader( _headerToken, _hashFormat, _hashCultureInfo ) );

      app.UseHttpsRedirection();
      app.UseSession();

      app.UseRouting();

      app.UseAuthorization();

      app.UseCors();

      app.UseEndpoints( endpoints =>
      {
        endpoints.MapControllers();
      } );
    }
  }
}
