using MyLetterStable.Model.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using SystemData;
using SystemData.Models;

namespace MyLetterStable.Seed
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<SystemContext>();
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();


            for (int i=120;i < 220;i++)
            {
                context.Height.AddRange(new Height { Id = i.ToString(), Name = "سم" + " " + i.ToString(), NameEn = "cm" + " " + i.ToString() });
            }
            context.SaveChangesAsync().Wait();

            for (int i = 18; i < 90; i++)
            {
                context.Age.AddRange(new Age { Id = i.ToString(), Name = "سنة" + " " + i.ToString(), NameEn = "years" + " " + i.ToString() });
            }
            context.SaveChangesAsync().Wait();


        
              
            //context.Seeking.AddRange(new Seeking { Id = "marriage_normal", Name = "زواج عادي", NameEn = "Marriage" });
            //context.Seeking.AddRange(new Seeking { Id = "marriage_misyar", Name = "زواج مسيار", NameEn = "Marriage Misyar" });
            //context.Seeking.AddRange(new Seeking { Id = "marriage_poly", Name = "زواج تعدد", NameEn = "Marriage polygamy" });
            //context.SaveChangesAsync().Wait();

            //Country 
            //context.Country.AddRange(new Country { Id = "egybet", Name = "مصر", NameEn = "Egypet",Short="EG" });
            //context.Country.AddRange(new Country { Id = "libya", Name = "ليبيا", NameEn = "Libya", Short = "LY" });
            //context.Country.AddRange(new Country { Id = "saudi", Name = "السعودية", NameEn = "Saudi Arabia", Short = "SA" });
            //context.Country.AddRange(new Country { Id = "iraq", Name = "العراق", NameEn = "Iraq", Short = "IQ" });
            //context.Country.AddRange(new Country { Id = "algeria", Name = "الجزائر", NameEn = "Algeria",Short="DZ" });
            //context.Country.AddRange(new Country { Id = "jordan", Name = "الأردن", NameEn = "Jordan",Short="JO" });
            //context.Country.AddRange(new Country { Id = "morocco", Name = "المغرب", NameEn = "Morocco",Short="MA" });
            //context.Country.AddRange(new Country { Id = "tunisia", Name = "تونس", NameEn = "Tunisia", Short = "TN" });
            //context.Country.AddRange(new Country { Id = "sudan", Name = "السودان", NameEn = "Sudan", Short = "SD" });
            //context.Country.AddRange(new Country { Id = "emirates", Name = "الإمارات", NameEn = "Emirates", Short = "AE" });
            //context.Country.AddRange(new Country { Id = "oman", Name = "عمان", NameEn = "Oman",Short="OM" });
            //context.Country.AddRange(new Country { Id = "qatar", Name = "قطر", NameEn = "Qatar", Short = "QA" });
            //context.Country.AddRange(new Country { Id = "yemen", Name = "اليمن", NameEn = "Yemen",Short="YM" });
            //context.Country.AddRange(new Country { Id = "kuwait", Name = "الكويت", NameEn = "Kuwait", Short = "KW" });
            //context.Country.AddRange(new Country { Id = "bahrain", Name = "البحرين", NameEn = "Bahrain", Short = "BH" });
            //context.Country.AddRange(new Country { Id = "lebanon", Name = "لبنان", NameEn = "Lebanon", Short = "LB" });
            //context.Country.AddRange(new Country { Id = "palestinian", Name = "فلسطين", NameEn = "Palestinian", Short = "PA" });
            //context.Country.AddRange(new Country { Id = "syria", Name = "سوريا", NameEn = "Syria", Short = "SY" });
            //context.SaveChangesAsync().Wait();


            context.Country.AddRange(new Country { Id = "eg", Name = "مصر", NameEn = "Egypt" });
            context.Country.AddRange(new Country { Id = "ly", Name = "ليبيا", NameEn = "Libya" });
            context.Country.AddRange(new Country { Id = "sa", Name = "السعودية", NameEn = "Saudi Arabia" });
            context.Country.AddRange(new Country { Id = "ir", Name = "العراق", NameEn = "Iraq" });
            context.Country.AddRange(new Country { Id = "dz", Name = "الجزائر", NameEn = "Algeria" });
            context.Country.AddRange(new Country { Id = "jo", Name = "الأردن", NameEn = "Jordan" });
            context.Country.AddRange(new Country { Id = "ma", Name = "المغرب", NameEn = "Morocco" });
            context.Country.AddRange(new Country { Id = "tn", Name = "تونس", NameEn = "Tunisia" });
            context.Country.AddRange(new Country { Id = "sd", Name = "السودان", NameEn = "Sudan" });
            context.Country.AddRange(new Country { Id = "ae", Name = "الإمارات", NameEn = "Emirates" });
            context.Country.AddRange(new Country { Id = "om", Name = "عمان", NameEn = "Oman" });
            context.Country.AddRange(new Country { Id = "qa", Name = "قطر", NameEn = "Qatar" });
            context.Country.AddRange(new Country { Id = "ye", Name = "اليمن", NameEn = "Yemen" });
            context.Country.AddRange(new Country { Id = "kw", Name = "الكويت", NameEn = "Kuwait" });
            context.Country.AddRange(new Country { Id = "bh", Name = "البحرين", NameEn = "Bahrain" });
            context.Country.AddRange(new Country { Id = "lb", Name = "لبنان", NameEn = "Lebanon" });
            context.Country.AddRange(new Country { Id = "ps", Name = "فلسطين", NameEn = "Palestinian" });
            context.Country.AddRange(new Country { Id = "sy", Name = "سوريا", NameEn = "Syria" });
            context.SaveChangesAsync().Wait();







            context.Gender.AddRange(new Gender { Id = "male", Name = "ذكر", NameEn = "Male" });
            context.Gender.AddRange(new Gender { Id = "female", Name = "أنثي", NameEn = "Female" });
            context.SaveChangesAsync().Wait();

            //  "label": "المهنة", Done
            context.Sector.AddRange(new Sector { Id = "student", Name = "طالب", NameEn = "Student" });
            context.Sector.AddRange(new Sector { Id = "freelancer", Name = "عمل حر", NameEn = "Freelancer" });
            context.Sector.AddRange(new Sector { Id = "employee", Name = "موظف", NameEn = "Employee" });
            context.Sector.AddRange(new Sector { Id = "unemployed", Name = "عاطل عن العمل", NameEn = "Unemployed" });
            context.SaveChangesAsync().Wait();



            //  "label": "الشخصية", Done
            context.Personality.AddRange(new Personality { Id = "INTJ", Name = "المهندس - INTJ", NameEn = "Architect - INTJ" });
            context.Personality.AddRange(new Personality { Id = "INTP", Name = "المنطقي - INTP", NameEn = "Logician - INTP" });
            context.Personality.AddRange(new Personality { Id = "ENTJ", Name = "القائد - ENTJ", NameEn = "Commander - ENTJ" });
            context.Personality.AddRange(new Personality { Id = "ENTP", Name = "المحاور - ENTP", NameEn = "Debater - ENTP" });
            context.Personality.AddRange(new Personality { Id = "INFP", Name = "الوسيط - INFP", NameEn = "Mediator - INFP" });
            context.Personality.AddRange(new Personality { Id = "INFJ", Name = "المحامي - INFJ", NameEn = "Advocate - INFJ" });
            context.Personality.AddRange(new Personality { Id = "ENFP", Name = "المناضل - ENFP", NameEn = "Campaigner - ENFP" });
            context.Personality.AddRange(new Personality { Id = "ENFJ", Name = "المناضل - ENFJ", NameEn = "Protagonist - ENFJ" });
            context.Personality.AddRange(new Personality { Id = "ISFJ", Name = "المدافع - ISFJ", NameEn = "Defender - ISFJ" });
            context.Personality.AddRange(new Personality { Id = "ISTJ", Name = "اللوجستي - ISTJ", NameEn = "Logistician - ISTJ" });
            context.Personality.AddRange(new Personality { Id = "ESFJ", Name = "القنصل - ESFJ", NameEn = "Consul - ESFJ" });
            context.Personality.AddRange(new Personality { Id = "ESTJ", Name = "التنفيذي - ESTJ", NameEn = "Executive - ESTJ" });
            context.Personality.AddRange(new Personality { Id = "ISFP", Name = "المغامر - ISFP", NameEn = "Adventurer - ISFP" });
            context.Personality.AddRange(new Personality { Id = "ISTP", Name = "الفنان المبدع - ISTP", NameEn = "Virtuoso - ISTP" });
            context.Personality.AddRange(new Personality { Id = "ESFP", Name = "ESFP - المسلي", NameEn = "Entertainer - ESFP" });
            context.Personality.AddRange(new Personality { Id = "ESTP", Name = "ESTP - رائد عمل", NameEn = "Entrepreneur - ESTP" });

            context.SaveChangesAsync().Wait();

            //Done Education
            // context.Education.AddRange(new Education { Id = "elementary_school", Name = "إبتدائي", NameEn = "Elementary school" });
            //context.Education.AddRange(new Education { Id = "vocational", Name = "تدريب مهني", NameEn = "Professionally trained" });
            context.Education.AddRange(new Education { Id = "high_school", Name = "ثانوي", NameEn = "High school" });
           // context.Education.AddRange(new Education { Id = "technical_education", Name = "معهد تقني", NameEn = "Technical education" });
           // context.Education.AddRange(new Education { Id = "academy", Name = "درجة الدبلوم", NameEn = "AP degree" });
            context.Education.AddRange(new Education { Id = "bachelors_degree", Name = "بكالوريوس", NameEn = "Bachelor's" });
            context.Education.AddRange(new Education { Id = "masters_degree", Name = "ماجستير", NameEn = "Master’s" });
            context.Education.AddRange(new Education { Id = "doctorate", Name = "دكتوراه", NameEn = "PhD" });
          //  context.Education.AddRange(new Education { Id = "school_of_life", Name = "مدرسة الحياة", NameEn = "School of Life" });


            //Done RelationShip
            context.Relationship.AddRange(new Relationship { Id = "single", NameEn = "Single", Name = "أعزب" });
            context.Relationship.AddRange(new Relationship { Id = "divorced", NameEn = "Divorced", Name = "مطلق" });
            context.Relationship.AddRange(new Relationship { Id = "widowed", NameEn = "Widowed", Name = "أرمل" });
        //    context.Relationship.AddRange(new Relationship { Id = "separated", NameEn = "Separated", Name = "منفصل" });
            context.Relationship.AddRange(new Relationship { Id = "married", NameEn = "Married", Name = "متزوج" });
            context.SaveChangesAsync().Wait();


            // Have Kids Done
            //context.Havekids.AddRange(new Havekids { Id = "no", Name = "لا يوجد أطفال", NameEn = "Don’t have kids" });
            //context.Havekids.AddRange(new Havekids { Id = "yes", Name = "يوجد أطفال", NameEn = "Have kids" });
            //context.SaveChangesAsync().Wait();


            // Zodic Done
            context.Zodiac.AddRange(new Zodiac { Id = "aries", Name = "الحمل", NameEn = "Aries" });
            context.Zodiac.AddRange(new Zodiac { Id = "taurus", Name = "الثور", NameEn = "Taurus" });
            context.Zodiac.AddRange(new Zodiac { Id = "gemini", Name = "الجوزاء", NameEn = "Gemini" });
            context.Zodiac.AddRange(new Zodiac { Id = "cancer", Name = "السرطان", NameEn = "Cancer" });
            context.Zodiac.AddRange(new Zodiac { Id = "leo", Name = "الأسد", NameEn = "Leo" });
            context.Zodiac.AddRange(new Zodiac { Id = "virgo", Name = "العذراء", NameEn = "Virgo" });
            context.Zodiac.AddRange(new Zodiac { Id = "libra", Name = "الميزان", NameEn = "Libra" });
            context.Zodiac.AddRange(new Zodiac { Id = "scorpio", Name = "العقرب", NameEn = "Scorpio" });
            context.Zodiac.AddRange(new Zodiac { Id = "sagittarius", Name = "القوس", NameEn = "Sagittarius" });
            context.Zodiac.AddRange(new Zodiac { Id = "capricorn", Name = "الجدي", NameEn = "Capricorn" });
            context.Zodiac.AddRange(new Zodiac { Id = "aquarius", Name = "الدلو", NameEn = "Aquarius" });
            context.Zodiac.AddRange(new Zodiac { Id = "pisces", Name = "الحوت", NameEn = "Pisces" });
            context.SaveChangesAsync().Wait();

         
            // التدين done 
            context.FamilyValues.AddRange(new FamilyValues { Id = "practising", Name = "ملتزم جدا", NameEn = "Very practising" });
            context.FamilyValues.AddRange(new FamilyValues { Id = "moderate", Name = "ملتزم بشكل معتدل", NameEn = "Moderately practising" });
            context.FamilyValues.AddRange(new FamilyValues { Id = "secular", Name = "غير ملتزم", NameEn = "Not practising" });
            context.SaveChangesAsync().Wait();


            //
            //context.FamilyValues.AddRange(new FamilyValues { Id = "niqab", Name = "نقاب", NameEn = "Very practising" });
            //context.FamilyValues.AddRange(new FamilyValues { Id = "moderate", Name = "عباءة", NameEn = "Moderately practising" });
            //context.FamilyValues.AddRange(new FamilyValues { Id = "secular", Name = "عباءة", NameEn = "Not practising" });
            //context.SaveChangesAsync().Wait();

            // المرتب done 
            context.Salary.AddRange(new Salary { Id = "200", Name = "$200 دولار شهريًا", NameEn = "$200 Monthly" });
            context.Salary.AddRange(new Salary { Id = "500", Name = "$500 دولار شهريًا", NameEn = "$500 Monthly" });
            context.Salary.AddRange(new Salary { Id = "700", Name = "$700 دولار شهريًا", NameEn = "$700 Monthly" });
            context.Salary.AddRange(new Salary { Id = "1000", Name = "$1000 دولار شهريًا", NameEn = "$1000 Monthly" });
            context.Salary.AddRange(new Salary { Id = "2000", Name = "$2000 دولار شهريًا", NameEn = "$2000 Monthly" });
            context.Salary.AddRange(new Salary { Id = "5000", Name = "+$5000 دولار شهريًا", NameEn = "+$5000 Monthly" });

            context.SaveChangesAsync().Wait();

            //done حفظ القرآن
            context.Book.AddRange(new Book { Id = "zero", Name = "قصار السور", NameEn = "short surahs" });
            context.Book.AddRange(new Book { Id = "one", Name = "جزء عمّ", NameEn = "One part" });
            context.Book.AddRange(new Book { Id = "two", Name = "جزئين", NameEn = "Two parts" });
            context.Book.AddRange(new Book { Id = "quarter", Name = "ربع القرآن", NameEn = "Quarter of the Quran" });
            context.Book.AddRange(new Book { Id = "half", Name = "نصف القرآن", NameEn = "Half of the Quran" });
            context.Book.AddRange(new Book { Id = "all", Name = "كل القرآن", NameEn = "The Whole Quran" });
            context.SaveChangesAsync().Wait();



            //done الاستعداد للأنتقال
            //context.Relocate.AddRange(new Relocate { Id = "willing", Name = "مستعد للانتقال", NameEn = "Open to relocate" });
            //context.Relocate.AddRange(new Relocate { Id = "not_sure", Name = "تغيير المكان قابل للنقاش", NameEn = "Unsure about relocating" });
            //context.Relocate.AddRange(new Relocate { Id = "stay", Name = "غير مستعد للانتقال", NameEn = "Not willing to relocate" });
            //context.SaveChangesAsync().Wait();

            //Done 
            //context.PolygamyOpinion.AddRange(new PolygamyOpinion { Id = "accept", Name = "مع تعدد الزوجات", NameEn = "Accept polygamy" });
            //context.PolygamyOpinion.AddRange(new PolygamyOpinion { Id = "maybe", Name = "التعدد إن دعت الضرورة", NameEn = "Might accept polygamy" });
            //context.PolygamyOpinion.AddRange(new PolygamyOpinion { Id = "not_accept", Name = "ضد تعدد الزوجات", NameEn = "Don’t accept polygamy" });
            //context.SaveChangesAsync().Wait();



            //Done
            context.Driver.AddRange(new Driver { Id = "accept", Name = "مع قيادة المرأة", NameEn = "Accept women driving" });
            context.Driver.AddRange(new Driver { Id = "maybe", Name = "القيادة إن دعت الضرورة", NameEn = "Might accept women driving" });
            context.Driver.AddRange(new Driver { Id = "not_accept", Name = "ضد قيادة المرأة", NameEn = "Don’t accept women driving" });
            context.SaveChangesAsync().Wait();
       

            //Done
            context.Work.AddRange(new Work { Id = "accept", Name = "مع عمل المرأة", NameEn = "Accept women's work" });
            context.Work.AddRange(new Work { Id = "maybe", Name = "العمل إن دعت الضرورة", NameEn = "Might accept women's work" });
            context.Work.AddRange(new Work { Id = "not_accept", Name = "ضد عمل المرأة", NameEn = "Don’t accept women's work" });
            context.SaveChangesAsync().Wait();
            //Done
            context.Hobbies.AddRange(new Hobbies { Id = "Writing", Name = "الكتابة", NameEn = "Writing" });
            context.Hobbies.AddRange(new Hobbies { Id = "Reading", Name = "القراءة", NameEn = "Reading" });
            context.Hobbies.AddRange(new Hobbies { Id = "Shopping", Name = "التسوق", NameEn = "Shopping" });
            context.Hobbies.AddRange(new Hobbies { Id = "Technology", Name = "تكنولوجيا المعلومات", NameEn = "Technology" });
            context.Hobbies.AddRange(new Hobbies { Id = "Music", Name = "الموسيقي", NameEn = "Music" });
            context.Hobbies.AddRange(new Hobbies { Id = "Fashion", Name = "الموضة", NameEn = "Fashion" });
            context.Hobbies.AddRange(new Hobbies { Id = "Cars", Name = "السيارات", NameEn = "Cars" });
            context.Hobbies.AddRange(new Hobbies { Id = "Photography", Name = "التصوير", NameEn = "Photography" });
            context.Hobbies.AddRange(new Hobbies { Id = "Sports", Name = "الرياضة", NameEn = "Sports" });
            context.Hobbies.AddRange(new Hobbies { Id = "Cooking", Name = "الطبخ", NameEn = "Cooking" });
            context.Hobbies.AddRange(new Hobbies { Id = "Business", Name = "التجارة", NameEn = "Business" });
            context.Hobbies.AddRange(new Hobbies { Id = "Politics", Name = "السياسة", NameEn = "Politics" });
            context.Hobbies.AddRange(new Hobbies { Id = "Art", Name = "الفن", NameEn = "Art" });
            context.Hobbies.AddRange(new Hobbies { Id = "History", Name = "التاريخ", NameEn = "History" });
            context.Hobbies.AddRange(new Hobbies { Id = "Education", Name = "التعليم", NameEn = "Education" });
            context.Hobbies.AddRange(new Hobbies { Id = "Science", Name = "العلوم", NameEn = "Science" });
            context.Hobbies.AddRange(new Hobbies { Id = "Family", Name = "العائلة", NameEn = "Family" });
            context.Hobbies.AddRange(new Hobbies { Id = "Relationships", Name = "العلاقات", NameEn = "Relationships" });
            context.Hobbies.AddRange(new Hobbies { Id = "Anime", Name = "الرسوم المتحركة", NameEn = "Anime" });
            context.Hobbies.AddRange(new Hobbies { Id = "Gaming", Name = "الألعاب الألكترونية", NameEn = "Gaming" });

            context.SaveChangesAsync().Wait();

            //Done
            context.Smoking.AddRange(new Smoking { Id = "no", Name = "غير مدخن", NameEn = "Non-smoker" });
            //context.Smoking.AddRange(new Smoking { Id = "quiting", Name = "جاري إيقاف التدخين", NameEn = "Trying to quit smoking" });
            //context.Smoking.AddRange(new Smoking { Id = "occasionaly", Name = "مدخن في المناسبات", NameEn = "Social smoker" });
            context.Smoking.AddRange(new Smoking { Id = "daily", Name = "مدخن", NameEn = "Smoker" });
            //context.Smoking.AddRange(new Smoking { Id = "waterpipe", Name = "السهر مع الشيشة", NameEn = "Enjoy smoking shisha" });
            //context.Smoking.AddRange(new Smoking { Id = "vaping", Name = "سيجارة إلكترونية", NameEn = "Puffing on e-cigarettes" });
            context.SaveChangesAsync().Wait();



            //Done
            //context.WantKids.AddRange(new WantKids { Id = "asap", Name = "مستعد للحصول على أطفال", NameEn = "Want kids soon" });
            //context.WantKids.AddRange(new WantKids { Id = "someday", Name = "مع إنجاب الأطفال يوما ما", NameEn = "Wants kids someday" });
            //context.WantKids.AddRange(new WantKids { Id = "more", Name = "مع فكرة تكثير الأولاد", NameEn = "Open to get more kids" });
            //context.WantKids.AddRange(new WantKids { Id = "not_sure", Name = "موضوع الإنجاب غير أكيد", NameEn = "Not sure about getting kids" });
            //context.WantKids.AddRange(new WantKids { Id = "enough", Name = "لا للمزيد من الأولاد", NameEn = "Have enough kids" });
            //context.WantKids.AddRange(new WantKids { Id = "no", Name = "لا رغبة بإنجاب الأطفال", NameEn = "Don’t want kids" });
            //context.SaveChangesAsync().Wait();


            //Done
            //Stamp
            context.Stamp.AddRange(new Stamp { Id = "/Stamp/deafult.png", Name = "deafult AR", NameEn = "deafult EN", Image = "/Stamp/AFR_savanna",
                Title= "deafult" });
        
  
            context.Stamp.AddRange(new Stamp { Id = "/Stamp/savanna.png", Name = "Savanna AR", NameEn = "Savanna EN",Image="/Stamp/AFR_savanna",Title= "savanna" });
            context.Stamp.AddRange(new Stamp { Id = "/Stamp/flower-daisy.png", Name = "Savanna AR", NameEn = "Savanna EN", Image = "/Stamp/AFR_savanna"
            ,Title ="flower"});
            context.Stamp.AddRange(new Stamp { Id = "/Stamp/lamp.png", Name = "Savanna AR", NameEn = "Savanna EN", Image = "/Stamp/AFR_savanna"
            ,Title ="lamp"});
            context.Stamp.AddRange(new Stamp { Id = "/Stamp/travel-plane.png", Name = "Savanna AR", NameEn = "Savanna EN", Image = "/Stamp/AFR_savanna"
            ,Title="travel"});
            context.SaveChangesAsync().Wait();



            //Dictionary<string, string> data = new Dictionary<string, string>(){
            //    {"label","Gender" },
            //    {"options",JsonConvert.SerializeObject(context.Sector.ToDictionary(kp => kp.Id, kp => kp.Name))}
            //};

            //StaticFields staticFields = new StaticFields()
            //{
            //    About = "عن نفسي",
            //    Age = JsonConvert.SerializeObject(
            //        new Dictionary<string, string>(){
            //    {"label","Gender" },
            //    {"options",JsonConvert.SerializeObject(context.Age.ToDictionary(kp => kp.Id, kp => kp.Name))}})
            //    .Replace(@"\", string.Empty),
            //    Sector = JsonConvert.SerializeObject(
            //        new Dictionary<string, string>(){
            //    {"label","Gender" },
            //    {"options",JsonConvert.SerializeObject(context.Sector.ToDictionary(kp => kp.Id, kp => kp.Name))}})
            //    .Replace(@"\", string.Empty)
            //};

            //var json = JsonConvert.SerializeObject(staticFields, Formatting.Indented).Replace(@"\",string.Empty).Replace(@"}""", "}").Replace(@"""{", "{");



            //string path = "C:\\log\\sample.txt";
            //using (StreamWriter writer = new StreamWriter(path, true))
            //{
            //  writer.WriteLine(json);
            //    writer.Close();
            //}


        }

      

      
        public static async Task SeedUsers(IServiceProvider serviceProvider,UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager)
        {

            var context = serviceProvider.GetRequiredService<SystemContext>();
            if (await userManager.Users.AnyAsync()) return;

            String maleImagePath = "_default-male.svg";
            String femaleImagePath = "_default-female.svg";
            var educations = context.Education.ToListAsync().Result;
            var works = context.Sector.ToListAsync().Result;

            if (educations !=null && works != null)
            {
                await userManager.CreateAsync(new AppUser {
                   
                    AgeId = "44",
                    AboutMe = "نبذة عني كذلك هذه نبذة عن“ولقد يكون في الدنيا ما يُغني الواحد من الناس عن أهل الأرض كافّة.. ولكن الدنيا بما وسعت لا يمكن أبدا أن تغني محبا عن الواحد الذي يحبه! هذا الواحد له حساب عجيب غير حساب العقل.. فإن الواحد في الحساب العقلي أول العدد.. أما في الحساب القلبي فهو أول العدد وآخره .. ليس بعده آخـِـر إذ ليس معه آخـَر”",
                    SectorId = works[1].Id, EducationId = educations[0].Id,Name = "sara", UserName = "LY00021", Image = "1.jpeg", GenderId = "female" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser {
                    AboutMe = "نبذة عني كذلك هذه نبذة عن“ولقد يكون في الدنيا ما يُغني الواحد من الناس عن أهل الأرض كافّة.. ولكن الدنيا بما وسعت لا يمكن أبدا أن تغني محبا عن الواحد الذي يحبه! هذا الواحد له حساب عجيب غير حساب العقل.. فإن الواحد في الحساب العقلي أول العدد.. أما في الحساب القلبي فهو أول العدد وآخره .. ليس بعده آخـِـر إذ ليس معه آخـَر”",

                    AgeId = "44", SectorId = works[1].Id,EducationId= educations[1].Id,Name = "ahmed", UserName = "ahmed",
                    Image = "2.jpeg", GenderId = "male" }, "Pa$$w0rd");

                await userManager.CreateAsync(new AppUser {
                    AboutMe = "نبذة عني كذلك هذه نبذة عن“ولقد يكون في الدنيا ما يُغني الواحد من الناس عن أهل الأرض كافّة.. ولكن الدنيا بما وسعت لا يمكن أبدا أن تغني محبا عن الواحد الذي يحبه! هذا الواحد له حساب عجيب غير حساب العقل.. فإن الواحد في الحساب العقلي أول العدد.. أما في الحساب القلبي فهو أول العدد وآخره .. ليس بعده آخـِـر إذ ليس معه آخـَر”",

                    SectorId = works[2].Id, EducationId = educations[1].Id, Name = "sara", UserName = "sara1",
                    Image = "3.jpeg", GenderId = "female" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser { AgeId = "23", SectorId = works[2].Id, EducationId = educations[2].Id,
                    Name = "marim", UserName = "sara2",
                    Image = "4.jpeg", GenderId = "female" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser { AgeId = "18",  SectorId = works[2].Id, EducationId = educations[2].Id,
                    Name = "manar", UserName = "sara3",
                    Image = "5.jpeg", GenderId = "female" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser { AgeId = "31",  SectorId = works[1].Id, EducationId = educations[1].Id, Name = "malak", UserName = "sara4", Image = femaleImagePath, GenderId = "female" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser { SectorId = works[2].Id, EducationId = educations[1].Id, Name = "hoda", UserName = "sara5",
                    Image = "6.jpeg", GenderId = "female" }, "Pa$$w0rd");

                //male

                await userManager.CreateAsync(new AppUser {
                    AboutMe = "نبذة عني كذلك هذه نبذة عن“ولقد يكون في الدنيا ما يُغني الواحد من الناس عن أهل الأرض كافّة.. ولكن الدنيا بما وسعت لا يمكن أبدا أن تغني محبا عن الواحد الذي يحبه! هذا الواحد له حساب عجيب غير حساب العقل.. فإن الواحد في الحساب العقلي أول العدد.. أما في الحساب القلبي فهو أول العدد وآخره .. ليس بعده آخـِـر إذ ليس معه آخـَر”",

                    SectorId = works[1].Id, EducationId = educations[1].Id, Name = "rami", UserName = "ahmed1",
                    Image = "7.jpeg", GenderId = "male" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser {
                    AboutMe = "نبذة عني كذلك هذه نبذة عن“ولقد يكون في الدنيا ما يُغني الواحد من الناس عن أهل الأرض كافّة.. ولكن الدنيا بما وسعت لا يمكن أبدا أن تغني محبا عن الواحد الذي يحبه! هذا الواحد له حساب عجيب غير حساب العقل.. فإن الواحد في الحساب العقلي أول العدد.. أما في الحساب القلبي فهو أول العدد وآخره .. ليس بعده آخـِـر إذ ليس معه آخـَر”",

                    SectorId = works[3].Id, EducationId = educations[3].Id, Name = "fahad", UserName = "ahmed2", Image = maleImagePath, GenderId = "male" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser { SectorId = works[2].Id, EducationId = educations[2].Id, Name = "said", UserName = "ahmed3", Image = maleImagePath, GenderId = "male" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser { SectorId = works[2].Id, EducationId = educations[0].Id, Name = "fawzi", UserName = "ahmed4", Image = maleImagePath, GenderId = "male" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser { SectorId = works[2].Id, EducationId = educations[3].Id, Name = "naser", UserName = "ahmed5", Image = maleImagePath, GenderId = "male" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser { SectorId = works[1].Id, EducationId = educations[2].Id, Name = "abdo", UserName = "ahmed6", Image = maleImagePath, GenderId = "male" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser { SectorId = works[2].Id, EducationId = educations[1].Id, Name = "mosa", UserName = "ahmed7", Image = maleImagePath, GenderId = "male" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser { SectorId = works[1].Id, EducationId = educations[2].Id, Name = "fisal", UserName = "ahmed8", Image = maleImagePath, GenderId = "male" }, "Pa$$w0rd");
                await userManager.CreateAsync(new AppUser { SectorId = works[0].Id, EducationId = educations[2].Id, Name = "samer", UserName = "ahmed9", Image = maleImagePath, GenderId = "male" }, "Pa$$w0rd");
            }
            var users = context.AppUser.ToListAsync().Result;

            context.UserHobbies.AddRange(new UserHobbies
            {
                AppUserId = users[4].Id,
             HobbiesId = "History",
            });
            context.UserHobbies.AddRange(new UserHobbies
            {
                AppUserId = users[4].Id,
                HobbiesId = "Art",
            });
            var stamps = context.Stamp.ToListAsync().Result;
            /*
            context.Messages.AddRange(new Message { RecipientId = users[1].Id ,SenderId = users[2].Id,Content="مثال عن نص الرسائل في الرسائل" ,
            StampId = stamps[1].Id , MessageSent = DateTime.Now.ToUniversalTime() ,Secret ="4",CountChar ="43"}) ;

            context.Messages.AddRange(new Message
            {
                RecipientId = users[1].Id,
                SenderId = users[2].Id,
                Content = "مثال عن نص الرسائل في الرسائل",
                StampId = stamps[1].Id,
                MessageSent = DateTime.Now.ToUniversalTime(),
                Secret = "4",
                CountChar = "43"
            });
            context.Messages.AddRange(new Message
            {
                RecipientId = users[4].Id,
                SenderId = users[3].Id,
                Content = "مثال عن نص الرسائل في الرسائل",
                StampId = stamps[2].Id,
                MessageSent = DateTime.Now.ToUniversalTime(),
                Secret = "4",
                CountChar = "43"
            });
            context.Messages.AddRange(new Message
            {
                RecipientId = users[2].Id,
                SenderId = users[1].Id,
                Content = "مثال عن نص الرسائل في الرسائل",
                StampId = stamps[3].Id,
                MessageSent = DateTime.Now.ToUniversalTime(),
                Secret = "4",
                CountChar = "43"
            });
            context.Messages.AddRange(new Message
            {
                RecipientId = users[5].Id,
                SenderId = users[1].Id,
                Content = "مثال عن نص الرسائل في الرسائل",
                StampId = stamps[2].Id,
                MessageSent = DateTime.Now.ToUniversalTime(),
                Secret = "4",
                CountChar = "43"
            });

            context.Messages.AddRange(new Message
            {
                RecipientId = users[5].Id,
                SenderId = users[4].Id,
                Content = "مثال عن نص الرسائل في الرسائل",
                StampId = stamps[2].Id,
                MessageSent = DateTime.Now.ToUniversalTime(),
                Secret = "4",
                CountChar = "43"
            });

            context.Messages.AddRange(new Message
            {
                RecipientId = users[3].Id,
                SenderId = users[2].Id,
                Content = "مثال عن نص الرسائل في الرسائل",
                StampId = stamps[2].Id,
                MessageSent = DateTime.Now.ToUniversalTime(),
                Secret = "4",
                CountChar = "43"
            });

            context.Messages.AddRange(new Message
            {
                RecipientId = users[2].Id,
                SenderId = users[3].Id,
                Content = "مثال عن نص الرسائل في الرسائل",
                StampId = stamps[2].Id,
                MessageSent = DateTime.Now.ToUniversalTime(),
                Secret = "4",
                CountChar = "43"
            });
            context.SaveChangesAsync().Wait();

            context.Messages.AddRange(new Message
            {
                RecipientId = users[2].Id,
                SenderId = users[3].Id,
                Content = "مثال عن نص الرسائل في الرسائل",
                StampId = stamps[2].Id,
                MessageSent = DateTime.Now.ToUniversalTime(),
                Secret = "4",
                CountChar = "43"
            });
            context.SaveChangesAsync().Wait();

            context.Messages.AddRange(new Message
            {
                RecipientId = users[2].Id,
                SenderId = users[3].Id,
                Content = "مثال عن نص الرسائل في الرسائل",
                StampId = stamps[2].Id,
                MessageSent = DateTime.Now.ToUniversalTime(),
                Secret = "4",
                CountChar = "43"
            });
            context.SaveChangesAsync().Wait();*/


            //  var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            // var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            //  if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
           



            

            //await userManager.AddToRoleAsync(user, "Member");

            //foreach (var user in users)
            //{
            //    user.UserName = user.UserName.ToLower();
            //    await userManager.CreateAsync(user, "Pa$$w0rd");
            //    await userManager.AddToRoleAsync(user, "Member");
            //}

            var admin = new AppUser
            {
                UserName = "admin"
            };

           // await userManager.CreateAsync(admin, "Pa$$w0rd");
           // await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
        }

    }
}
