using System;

namespace EmailWatcher.Database.Model
{
  public class Parameter
  {
    public long IDParameter { get; set; }
    public string TipeParameter { get; set; }
    public string NilaiParameter { get; set; }
    public string UserAdd { get; set; }
    public string UserUpd { get; set; }
    public DateTime? Tanggal { get; set; }
  }
}
