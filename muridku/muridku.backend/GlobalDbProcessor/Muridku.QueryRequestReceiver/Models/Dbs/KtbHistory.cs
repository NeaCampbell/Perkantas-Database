﻿using System;

namespace Muridku.QueryRequestReceiver.Models.Dbs
{
  public class KtbHistory : ModelDbBase
  {
    public long ktb_id { get; set; }
    public DateTime meet_dt { get; set; }
    public long material_id { get; set; }
    public string material_name { get; set; }
    public int material_chapter { get; set; }
    public int is_active { get; set; }
  }
}
