using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SystemData.Models
{
    public class Ads
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Title { get; set; }
        public DateTime EndDate { get; set; }
        public int ShowCount { get; set; }
        public int SecretKey { get; set; }
        public string Image { get; set; }
        public string Color { get; set; }

        public string Content { get; set; }
    }
}
