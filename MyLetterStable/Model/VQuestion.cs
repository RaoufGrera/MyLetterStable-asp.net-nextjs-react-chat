namespace MyLetterStable.Model
{
    public class VQuestion
    {
        public string Id  { get; set; }

        public long SenderId { get; set; }
        public string Ask { get; set; }
        public string Answer { get; set; }
        public string Stamp { get; set; }
    }
}