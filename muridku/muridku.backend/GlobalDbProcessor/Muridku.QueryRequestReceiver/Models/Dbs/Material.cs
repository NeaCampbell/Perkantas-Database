namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class Material : ModelDbBase
  {
    public string code { get; set; }
    public string name { get; set; }
    public int chapter_count { get; set; }
  }
}
