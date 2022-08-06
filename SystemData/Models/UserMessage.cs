using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SystemData.Models
{
    public class UserMessage
    {
        public long Id { get; set; }

        public AppUser User { get; set; }
        public long UserId { get; set; }

        public Message Message { get; set; }
        public string MessageId { get; set; }
        public string Key { get; set; }

    }
}