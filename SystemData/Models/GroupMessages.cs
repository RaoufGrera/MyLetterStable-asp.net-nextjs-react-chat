using System;
using System.Collections.Generic;
using System.Text;

namespace SystemData.Models
{
    public class GroupMessages
    {
        public long Id { get; set; }

        public AppUser FirstUser { get; set; }
        public long FirstUserId { get; set; }

        public AppUser SecondUser { get; set; }
        public long SecondUserId { get; set; }
        public DateTime LastUpdated { get; set; }

    }
}
