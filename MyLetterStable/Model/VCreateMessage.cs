namespace MyLetterStable.Model
{
    public class VCreateMessage
    {
        public string RecipientUsername { get; set; }
        public string Content { get; set; }
        public string Stamp { get; set; }
        public int Secret { get; set; }

        public int CountChar { get; set; }

    }
}