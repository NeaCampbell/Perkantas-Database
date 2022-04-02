namespace EmailWatcher.Database
{
    public class EmailParameter
  {
    public long OutboxId { get; set; }
    public long UserId { get; set; }
    public string Destination { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
  }
}
