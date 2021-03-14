using System.Data;

namespace QueryOperator.Builder.Connection
{
    public interface IDbConnectionBuilder<TDbServiceType>
    {
        IDbConnection Build();
    }
}
