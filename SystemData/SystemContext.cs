using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Text;
using SystemData.Models;

namespace SystemData
{
    public class SystemContext : IdentityDbContext<AppUser, AppRole, long,
        IdentityUserClaim<long>, AppUserRole, IdentityUserLogin<long>,
        IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
                  
    public SystemContext(DbContextOptions options) : base(options)
        {
        }


        public DbSet<PublicMessage> PublicMessages { get; set; }
        public DbSet<AppUser> AppUser { get; set; }
       // public DbSet<Seeking> Seeking { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<Home> Home { get; set; }

        public DbSet<Age> Age { get; set; }
        public DbSet<Height> Height { get; set; }
        public DbSet<Gender> Gender { get; set; }
        public DbSet<Sector> Sector { get; set; }
        public DbSet<Education> Education { get; set; }
        public DbSet<Relationship> Relationship { get; set; }
       // public DbSet<Havekids> Havekids { get; set; }
        public DbSet<Zodiac> Zodiac { get; set; }
        public DbSet<Salary> Salary { get; set; }
        public DbSet<GroupMessages> GroupMessages { get; set; }

        // Lifestyle
        public DbSet<FamilyValues> FamilyValues { get; set; }
        //public DbSet<Relocate> Relocate { get; set; }
       // public DbSet<PolygamyOpinion> PolygamyOpinion { get; set; }
        public DbSet<Driver> Driver { get; set; }
        public DbSet<Smoking> Smoking { get; set; }
        public DbSet<Work> Work { get; set; }
        //   public DbSet<WantKids> WantKids { get; set; }

      //  public DbSet<Ads> Ads { get; set; }
        public DbSet<UserMessage> UserMessage { get; set; }

        public DbSet<Book> Book { get; set; }

        public DbSet<Hobbies> Hobbies { get; set; }
        public DbSet<UserHobbies> UserHobbies { get; set; }

        public DbSet<Notification> Notifications { get; set; }
       // public DbSet<Favorite> Favorite { get; set; }
        public DbSet<Question> Question { get; set; }

        public DbSet<Personality> Personality { get; set; }


        public DbSet<Message> Messages { get; set; }




        //        public DbSet<UserHobbies> UserHobbies { get; set; }

        // public DbSet<Hobbies> Hobbies { get; set; }
        //   public DbSet<SocialStatus> SocialStatus { get; set; }
        //   public DbSet<Career> Career { get; set; }
        //    public DbSet<Transition> Transition { get; set; }
        
        public DbSet<UserLike> Likes { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Stamp> Stamp { get; set; }

        public DbSet<Connection> Connections { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
             
            builder.Entity<Group>()
                .HasMany(x => x.Connections)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();


            builder.Entity<UserLike>()
                .HasKey(k => new { k.SourceUserId, k.LikedUserId });

            builder.Entity<UserLike>()
                .HasOne(s => s.SourceUser)
                .WithMany(l => l.LikedUsers)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLike>()
                .HasOne(s => s.LikedUser)
                .WithMany(l => l.LikedByUsers)
                .HasForeignKey(s => s.LikedUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<GroupMessages>()
               .HasOne(u => u.FirstUser)
               .WithMany(m => m.GroupMessagesFirst)
               .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<GroupMessages>()
               .HasOne(u => u.SecondUser)
               .WithMany(m => m.GroupMessagesSecond)
               .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Notification>()
               .HasOne(u => u.AppUser)
               .WithMany(m => m.NotificationsUsers)
               .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<Notification>()
               .HasOne(u => u.Source)
               .WithMany(m => m.NotificationsSourceUsers)
               .OnDelete(DeleteBehavior.Cascade);
            

            builder.Entity<PublicMessage>()
               .HasOne(u => u.Sender)
               .WithMany(m => m.publicMessagesUser)
               .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ApplyUtcDateTimeConverter();
        }
    }

    public static class UtcDateAnnotation
    {
        private const String IsUtcAnnotation = "IsUtc";
        private static readonly ValueConverter<DateTime, DateTime> UtcConverter =
          new ValueConverter<DateTime, DateTime>(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        private static readonly ValueConverter<DateTime?, DateTime?> UtcNullableConverter =
          new ValueConverter<DateTime?, DateTime?>(v => v, v => v == null ? v : DateTime.SpecifyKind(v.Value, DateTimeKind.Utc));

        public static PropertyBuilder<TProperty> IsUtc<TProperty>(this PropertyBuilder<TProperty> builder, Boolean isUtc = true) =>
          builder.HasAnnotation(IsUtcAnnotation, isUtc);

        public static Boolean IsUtc(this IMutableProperty property) =>
          ((Boolean?)property.FindAnnotation(IsUtcAnnotation)?.Value) ?? true;

        /// <summary>
        /// Make sure this is called after configuring all your entities.
        /// </summary>
        public static void ApplyUtcDateTimeConverter(this ModelBuilder builder)
        {
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (!property.IsUtc())
                    {
                        continue;
                    }

                    if (property.ClrType == typeof(DateTime))
                    {
                        property.SetValueConverter(UtcConverter);
                    }

                    if (property.ClrType == typeof(DateTime?))
                    {
                        property.SetValueConverter(UtcNullableConverter);
                    }
                }
            }
        }
    }

}

