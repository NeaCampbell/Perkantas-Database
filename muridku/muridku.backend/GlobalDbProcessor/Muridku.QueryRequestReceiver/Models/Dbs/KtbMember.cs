namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class KtbMember : ModelDbBase
  {
    public long ktb_id { get; set; }
    public long member_id { get; set; }
    public int is_pktb { get; set; }
    public int is_active { get; set; }
    public long? old_ktb_id { get; set; }
  }
}
