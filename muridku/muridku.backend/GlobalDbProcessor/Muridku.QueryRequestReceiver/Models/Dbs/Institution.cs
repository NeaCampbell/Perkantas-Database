namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class Institution : ModelDbBase
  {
    public string code { get; set; }
    public string name { get; set; }
    public string type { get; set; }
    public string address { get; set; }
  }
}
