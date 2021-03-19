using System;
using System.Collections.Generic;
using System.Text;

namespace QueryManager
{
    public interface IRequestResult
    {
        bool Result { get; }
        string Message { get; }
    }
}
