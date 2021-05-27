﻿using System;

namespace Muridku.QueryRequestReceiver.Models.Dbs.Combined
{
  public class CombinedKtbMemberEmail : ModelDbBase
  {
    public long ktb_id { get; set; }
    public string email { get; set; }
    public string name { get; set; }
    public string address { get; set; }
    public DateTime? birth_dt { get; set; }
    public string birth_place { get; set; }
    public string mobile_phn { get; set; }
    public long? institution_id { get; set; }
    public long? faculty_id { get; set; }
  }
}
