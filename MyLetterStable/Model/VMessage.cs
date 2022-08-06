using System;
using System.Text.Json.Serialization;

namespace MyLetterStable.Model
{
    public class VMessage
    {
        public string Id { get; set; }
        public long SenderId { get; set; }
        public string StampId { get; set; }
        public string SenderName { get; set; }
        public string SenderCountry { get; set; }

    
        public string Ago { get; set; }

        public string CountChar { get; set; }
        public string Secret { get; set; }
        public long RecipientId { get; set; }

        public string RecipientUsername { get; set; }
        public string RecipientPhotoUrl { get; set; }
        public string SenderUsername { get; set; }
        public string SenderImage { get; set; }
        public bool IsPublic { get; set; }
        public string PublicMessageId { get; set; }

      
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
        public string MessageNumber { get; set; }
        public string MessageAgo { get; set; }

        [JsonIgnore]
        public bool SenderDeleted { get; set; }

        [JsonIgnore]
        public bool RecipientDeleted { get; set; }
    }
}