using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SystemData.Models
{
   
    public class Notification
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        
        public string SourceName { get; set; }

        public AppUser AppUser { get; set; }
        public long AppUserId { get; set; }
        public string Username { get; set; }

        public AppUser Source { get; set; }
        public long? SourceId { get; set; }
        public bool IsRead { get; set; }

        public DateTime ReadAt { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow.AddHours(2);



    }
}
