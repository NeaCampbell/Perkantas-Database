namespace Muridku.QueryRequestReceiver.Models.Dbs.Combined
{
  public class CombinedMemberUserInstituteFaculty
  {
    public Member member { get; set; }
    public User user { get; set; }
    public Institution institution { get; set; }
    public Faculty faculty { get; set; }
  }
}
