using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Muridku.QueryRequestReceiver.Middleware
{
  public interface IMiddleware
  {
    Task Invoke( HttpContext context );
  }
}
