using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SystemData.Models
{
    public class GeneralTable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        [Required,MaxLength(70)]
        public string Name { get; set; }

        [Required, MaxLength(70)]
        public string NameEn { get; set; }

        public DateTime CreationDate = DateTime.UtcNow;
      //  public int Order { get; set; }
      //  public string Image { get; set; }
    }

    public class Stamp : GeneralTable {  
        public string Image { get; set; }
        public string Title { get; set; }
    }


   // public class Seeking : GeneralTable { }
   // public class Country : GeneralTable { }
    public class Home : GeneralTable { }

    public class Salary : GeneralTable { }
    public class Book : GeneralTable { }

    public class Age : GeneralTable { }
    public class Height : GeneralTable { }
    public class Gender : GeneralTable { }

    //Essentials
    public class Sector : GeneralTable { }
    public class Education : GeneralTable { }
    public class Relationship : GeneralTable { }
    public class Havekids : GeneralTable { }

    public class Zodiac : GeneralTable { }
     public class Personality : GeneralTable { }


    // Lifestyle
    public class FamilyValues : GeneralTable { }
    public class Relocate : GeneralTable { }
   // public class PolygamyOpinion : GeneralTable { }
    public class Driver : GeneralTable { }
    public class Smoking : GeneralTable { }
    public class Work : GeneralTable { }
    // public class WantKids : GeneralTable { }

     public class Hobbies : GeneralTable { public ICollection<UserHobbies> UserHobbies { get; set; } }



    // public class Hobbies : GeneralTable { public ICollection<UserHobbies> UserHobbies { get; set; } }


}
