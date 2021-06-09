namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class KtbHistoryMember : ModelDbBase
  {
    public long ktb_history_id { get; set; }
    public long member_id { get; set; }
    public int is_attending { get; set; }
  }
}
