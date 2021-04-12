namespace Common
{
  public class ThreadConfig
  {
    public int MaxQueueCount { get; set; }
    public int ThreadCount { get; set; }
    public int ThreadPoolWaitingTime { get; set; }
    public int RequestWaitingTime { get; set; }
  }
}
