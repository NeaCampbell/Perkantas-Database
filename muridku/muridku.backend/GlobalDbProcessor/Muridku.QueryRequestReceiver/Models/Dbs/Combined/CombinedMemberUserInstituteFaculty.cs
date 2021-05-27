namespace Muridku.QueryRequestReceiver.Models.Dbs.Combined
{
  public class CombinedMemberUserInstituteFaculty
  {
    public Member Member { get; set; }
    public User User { get; set; }
    public Institution Institution { get; set; }
    public Faculty Faculty { get; set; }
  }
}
