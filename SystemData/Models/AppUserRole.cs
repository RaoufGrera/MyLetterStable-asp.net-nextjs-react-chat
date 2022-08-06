using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace SystemData.Models
{
    public class AppUserRole : IdentityUserRole<long>
    {
        public AppUser User { get; set; }
        public AppRole Role { get; set; }
    }
}