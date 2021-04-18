namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class MemberInstitutionHist : ModelDbBase
  {
    public long member_id { get; set; }
    public long institution_id { get; set; }
    public long? faculty_id { get; set; }
  }
}
