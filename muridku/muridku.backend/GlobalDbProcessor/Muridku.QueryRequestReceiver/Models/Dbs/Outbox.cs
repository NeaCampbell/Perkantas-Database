namespace Muridku.QueryRequestReceiver.Models.Dbs
{
    public class Outbox : ModelDbBase
    {
        public long user_id { get; set; }
        public string destination { get; set; }
        public string title { get; set; }
        public string message { get; set; }
        public int status { get; set; }
    }
}
