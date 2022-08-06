using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace SystemData.Models
{
    public class AppUser : IdentityUser<long>
    {

        // [DefaultValue(false)] public bool IsAdmin { get; set; }
        // [DefaultValue(false)] public bool HaveChildren { get; set; }
        //  public ICollection<UserHobbies> UserHobbies { get; set; }
        //  public SocialStatus SocialStatus { get; set; }
        //  public string SocialStatusId { get; set; }
        public bool Online { get; set; }

       public int ShowCount { get; set; }
        public int LikeCount { get; set; }

        public long? FacebookId { get; set; }
        public string GmailId { get; set; }
        public string AboutMe { get; set; }
        //public string SearchFor { get; set; }


        
        public string Name { get; set; }
        public string FcmToken { get; set; }

        public virtual Home Home { get; set; }
        public string HomeId { get; set; }
    
        public virtual Country Country { get; set; }
        public string CountryId { get; set; }

        public virtual Salary Salary { get; set; }
        public string SalaryId { get; set; }
        public virtual Gender Gender { get; set; }
        public string GenderId { get; set; }
        public virtual Age Age { get; set; }
        public string AgeId { get; set; }

        public virtual Height Height { get; set; }
        public string HeightId { get; set; }

        public virtual Sector Sector { get; set; }
        public string SectorId { get; set; }
        public virtual Book Book { get; set; }
        public string BookId { get; set; }
        public virtual Education Education { get; set; }
        public string EducationId { get; set; }

        public virtual Relationship Relationship { get; set; }
        public string RelationshipId { get; set; }

        //  public virtual Havekids Havekids { get; set; }
        // public string HavekidsId { get; set; }
        // public virtual Seeking Seeking { get; set; }
        //  public string SeekingId { get; set; }
        //public virtual Relocate Relocate { get; set; }
        //public string RelocateId { get; set; }
        //public virtual PolygamyOpinion PolygamyOpinion { get; set; }
        //public string PolygamyOpinionId { get; set; }
        public virtual Zodiac Zodiac { get; set; }
        public string ZodiacId { get; set; }



        public virtual FamilyValues FamilyValues { get; set; }
        public string FamilyValuesId { get; set; }
  
        public virtual Smoking Smoking { get; set; }
        public string SmokingId { get; set; }
        public virtual Driver Driver { get; set; }
        public string DriverId { get; set; }
        public virtual Personality Personality { get; set; }
        public string PersonalityId { get; set; }
        
        public virtual Work Work { get; set; }
        public string WorkId { get; set; }
       // public virtual WantKids WantKids { get; set; }
        //public string WantKidsId { get; set; }



        public string Provider { get; set; }

        public string Image { get; set; }


       

        public string Token { get; set; }


        public string Password { get; set; }

        /*
      //social_status // معلومات أولية
      public string Seeking { get; set; }
      public string Height { get; set; }
      public string Sector { get; set; }

      public string Education { get; set; }

      public string Relationship { get; set; }
      public string Have_kids { get; set; }
      public string Zodiac { get; set; }

     */

        public DateTime Created { get; set; } = DateTime.Now.ToUniversalTime();
        public DateTime LastActive { get; set; } = DateTime.Now.ToUniversalTime();

       // public ICollection<Photo> Photos { get; set; }

        public ICollection<Notification> NotificationsUsers { get; set; }
        public ICollection<Notification> NotificationsSourceUsers { get; set; }

        public ICollection<PublicMessage> publicMessagesUser { get; set; }

        public ICollection<UserLike> LikedByUsers { get; set; }
        public ICollection<UserLike> LikedUsers { get; set; }


        public ICollection<GroupMessages> GroupMessagesFirst { get; set; }
        public ICollection<GroupMessages> GroupMessagesSecond { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }

    }
}