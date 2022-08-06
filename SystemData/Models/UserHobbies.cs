using System;
using System.Collections.Generic;
using System.Text;

namespace SystemData.Models
{
    public class UserHobbies
    {
        public int Id { get; set; }
        public AppUser appUser { get; set; }
        public long AppUserId { get; set; }

        public Hobbies hobbies { get; set; }
        public string HobbiesId { get; set; }
    }
}
