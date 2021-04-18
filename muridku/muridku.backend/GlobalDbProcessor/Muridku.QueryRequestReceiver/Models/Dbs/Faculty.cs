namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class Faculty : ModelDbBase
  {
    public long institution_id { get; set; }
    public string code { get; set; }
    public string name { get; set; }
  }
}