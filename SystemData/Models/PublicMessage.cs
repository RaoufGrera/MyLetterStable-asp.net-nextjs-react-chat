using System;
using System.ComponentModel.DataAnnotations.Schema;


namespace SystemData.Models
{
    public class PublicMessage
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public Stamp Stamp { get; set; }
        public string StampId { get; set; }
        public AppUser Sender { get; set; }
        public long SenderId { get; set; }
        public string SenderUsername { get; set; }
        public string Content { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.UtcNow.AddHours(2);
        public bool SenderDeleted { get; set; }
        public int ShowCount { get; set; }
        public int LikeCount { get; set; }
        public DateTime ArrivalDate { get; set; }

    }
}
