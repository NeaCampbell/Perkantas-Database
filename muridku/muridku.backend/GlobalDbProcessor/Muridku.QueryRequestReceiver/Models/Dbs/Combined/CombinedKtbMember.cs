﻿using System.Collections.Generic;

namespace Muridku.QueryRequestReceiver.Models.Dbs.Combined
{
  public class CombinedKtbMember
  {
    public Ktb ktb { get; set; }
    public IList<CombinedMemberUserInstituteFaculty> members { get; set; }
  }
}
