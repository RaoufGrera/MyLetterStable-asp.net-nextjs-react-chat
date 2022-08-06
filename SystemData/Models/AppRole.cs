using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace SystemData.Models
{
    
    public class AppRole : IdentityRole<long>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}