namespace MyLetterStable.Model
{
    public class VNewBoardMessage
    {
        public string RecipinetUsername { get; set; }
        public long RecipientId { get; set; }
     
        public long SenderId { get; set; }
        public string Content { get; set; }
    }
}
