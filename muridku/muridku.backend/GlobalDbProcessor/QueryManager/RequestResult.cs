namespace QueryManager
{
    internal class RequestResult: IRequestResult
    {
        public RequestResult(bool result, string message)
        {
            Result = result;
            Message = message;
        }

        public bool Result { get; private set; }
        public string Message { get; private set; }
    }
}
