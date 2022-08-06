using AutoMapper;
using AutoMapper.QueryableExtensions;
using MyLetterStable.Extensions;
using MyLetterStable.Model;
using MyLetterStable.SignalR;
using HeyRed.Mime;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using SystemData;
using SystemData.Models;

namespace MyLetterStable.Services
{

    public interface IUserServices
    {
        VProfile Profile(string UserName);
        VProfile UploadImage(string UserName, IFormCollection formCollection);
        VProfile Edit(string UserName, VEdit data);
        Task<VProfile> GetById(int UserId);
       IEnumerable<VMessage> GetMessagesById(long currentId,long UserId);

        IEnumerable<VQuestion> GetQuestions(long currentId);
        IEnumerable<VProfile> getUsers(VSearch vSearch);

        IEnumerable<Stamp> GetStamps();

        VMessage GetMessage(string msg,long CurrenId);

        VMessage OpenMessage(VSecret vMessage,long UserId);
        bool addLikeUser(long currentId, long userId);
        IEnumerable<VMessage> GetAllMessages();//long UserId
        Task<bool> SendMessagesById(VCreateMessage Data, long currentId, long UserId);
        Task<bool> SendMessagesByPublic(VCreateMessage Data, long currentId);

        
        VQuestion GetQuestionById(long currentId, string AskId);
        Task<bool> SendQuestionById(VQuestion data, long currentId, long UserId);
       // Task<bool> SendNewBoardMessage(VBoardMessage data, long currentId);

        bool AnswerQuestionById(VQuestion data, long currentId, string askId);

         (string, string) TimeAgo(DateTime dateTime);
    }
    public class UserService : IUserServices
    {
        private SystemContext _context;
        private readonly AppSettings _appSettings;
        private readonly UserManager<AppUser> _mUserManager;
        private readonly IMapper _mapper;
        private readonly MessageHub _messageHub;
        public UserService(SystemContext context, UserManager<AppUser> userManager,IMapper mapper, MessageHub messageHub)
        {
            _context = context;
            _mUserManager = userManager;
            _mapper = mapper;
            _messageHub = messageHub;
        }
        public VProfile Profile(string UserName)
        {
            var std = _context.AppUser.FirstOrDefault(a => a.UserName == UserName);

            if (std == null)
                return null;

            return FillProfile(std);
            

        }

        public VProfile Edit(string UserName,VEdit data)
        {

          
            var std = _context.AppUser.FirstOrDefault(a => a.UserName == UserName);
            switch (data.Name)
            {
                case "hobbies":
                    
                    string[] words = data.Value.Split(",");
                    var list = _context.UserHobbies.Where(c => c.AppUserId  == std.Id).ToList();
                    _context.UserHobbies.RemoveRange(list);
                    _context.SaveChanges();
                    if (words.Length == 0)
                        break;
                        var items = _context.Hobbies.Where(p => words.Contains(p.Id)).Select(p=>p.Id).ToList();
                        if (!items.Any())
                            break;

                        foreach(var item in items)
                        {
                            UserHobbies userHobbies = new UserHobbies();
                            userHobbies.HobbiesId = item;
                             userHobbies.AppUserId= std.Id;
                        _context.UserHobbies.Add(userHobbies);
                        }
                    _context.SaveChanges();
                    

                    break;
                //social_status
                case "gender":
                    std.GenderId = _context.Gender.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                 //   var folderName = Path.Combine("StaticFiles", "Images");
                    var maleImagePath = "default-male.svg";
                    var femaleImagePath ="default-female.svg";

                    if (maleImagePath == std.Image)
                        std.Image = femaleImagePath;
                    

                    _context.SaveChanges();
                    break;
                //case "seeking":
                //    std.SeekingId = _context.Seeking.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                //    _context.SaveChanges();
                    //break;
                case "home":
                    std.HomeId = _context.Home.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;

                case "personality":
                    std.PersonalityId = _context.Personality.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                case "country":
                    std.CountryId = _context.Country.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                case "age":
                    std.AgeId = _context.Age.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                case "height":
                    std.HeightId = _context.Height.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                case "sector":

                    std.SectorId = _context.Sector.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;

                case "book":

                    std.BookId = _context.Book.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                case "education":
                    std.EducationId = _context.Education.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                case "relationship":
                    std.RelationshipId = _context.Relationship.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                //case "have_kids":
                //    std.HavekidsId = _context.Havekids.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                //    _context.SaveChanges();
                    //break;
                case "zodiac":
                    std.ZodiacId = _context.Zodiac.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;

                //lifestyle
                case "family_values":
                    std.FamilyValuesId = _context.FamilyValues.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                //case "relocate":
                //    std.RelocateId = _context.Relocate.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                //    _context.SaveChanges();
                //    break;
                //case "polygamy_opinion":
                //    std.PolygamyOpinionId = _context.PolygamyOpinion.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                //    _context.SaveChanges();
                //    break;
                case "driver":
                    std.DriverId = _context.Driver.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                case "work":
                    std.WorkId = _context.Work.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                case "smoking":
                    std.SmokingId = _context.Smoking.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                case "salary":
                    std.SalaryId = _context.Salary.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                    _context.SaveChanges();
                    break;
                //case "want_kids":
                //    std.WantKidsId = _context.WantKids.Where(o => o.Id == data.Value).Select(p => (p.Id != null) ? p.Id : null).SingleOrDefault();
                //    _context.SaveChanges();
                //    break;
                case "name":
                    std.Name = data.Value;
                    _context.SaveChanges();
                    break;

                case "username":
                    if(data.Value != null && data.Value.Length > 3) { 
                        var isexist = _context.Users.Where(u => u.UserName == data.Value).Any();
                        if (!isexist) { 
                            std.UserName = data.Value;
                            _context.SaveChanges();
                        }
                    }
                    break;
                case "about":
                    std.AboutMe = data.Value;
                    _context.SaveChanges();
                    break;
                //case "looking":
                //    std.SearchFor = data.Value;
                //    _context.SaveChanges();
                //    break;

            }
            std = _context.AppUser.FirstOrDefault(a => a.UserName == UserName);
            return FillProfile(std);
        }

        public VProfile UploadImage(string UserName, IFormCollection formCollection)
        {
            var std = _context.AppUser.FirstOrDefault(a => a.UserName == UserName);

            var file = formCollection.Files.First();
            //  var file = Request.Form.Files[0];
            var folderName = Path.Combine("wwwroot/StaticFiles", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (file.Length > 0)
            {

                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                var mimeType = MimeTypesMap.GetMimeType(fileName); // => image/jpeg

                var ext = MimeTypesMap.GetExtension(mimeType); // => jpeg
                Random rd = new Random();
                int rand_num = rd.Next(100, 2000);
                fileName = std.UserName + rand_num + "." + ext;


                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);


                if (System.IO.File.Exists(fullPath))
                {
                    // return BadRequest("It IS Here");
                    System.IO.File.Delete(fullPath);
                }
                var pathLocalImage =  new List<string>(new string[] {"_default-male.svg", "_default-female.svg" });
                if (!pathLocalImage.Any(s => s.Contains(std.Image)))
                {
                   
                    var dbOldPath = Path.Combine(folderName, std.Image);
                    System.IO.File.Delete(dbOldPath);

                }
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                std.Image = fileName;
                _context.SaveChanges();

                 return FillProfile(std);
            }
            
                return null;
            
         
        }

        public VProfile FillProfile(AppUser objUser)
        {
            VProfile vProfile = new VProfile();
            vProfile.username = objUser.UserName;
            vProfile.online = objUser.Online;
            vProfile.about = objUser.AboutMe;
            vProfile.country = objUser.CountryId;
            vProfile.home = objUser.HomeId;
            vProfile.personality = objUser.PersonalityId;
            // vProfile.seeking = objUser.SeekingId;
            vProfile.username = objUser.UserName;

            vProfile.age = objUser.AgeId;
            vProfile.gender = objUser.GenderId;
            vProfile.height = objUser.HeightId;
            //vProfile.have_kids = objUser.HavekidsId;
            //vProfile.looking = objUser.SearchFor;
            vProfile.education = objUser.EducationId;
            vProfile.relationship = objUser.RelationshipId;
            vProfile.name = objUser.Name;
            vProfile.family_values = objUser.FamilyValuesId;
            //vProfile.relocate = objUser.RelocateId;
            //vProfile.polygamy_opinion = objUser.PolygamyOpinionId;
            vProfile.smoking = objUser.SmokingId;
            vProfile.sector = objUser.SectorId;
            vProfile.driver = objUser.DriverId;
            vProfile.work = objUser.WorkId;
            vProfile.salary = objUser.SalaryId;
            vProfile.book = objUser.BookId;
            vProfile.hobbies = _context.UserHobbies.Where(o => o.AppUserId == objUser.Id).Select(r => r.HobbiesId).ToList();
            
            //vProfile.want_kids = objUser.WantKidsId;
            vProfile.zodiac = objUser.ZodiacId;
            vProfile.image = objUser.Image;
            vProfile.id = objUser.Id;
            vProfile.ActiveAgo = TimeAgoStatic(objUser.LastActive).Item1;

            vProfile.ActiveNumber = TimeAgoStatic( objUser.LastActive).Item2;
            return vProfile;
        }

        public IEnumerable<VProfile> getUsers(VSearch vSearch)
        {

            Random rand = new Random();
            int toSkip = 0;//rand.Next(0, _context.Users.Count() - 9);

            int page;
            const int records_at_page = 10;

            bool itIsPage = int.TryParse(vSearch.page, out page);
            if (!itIsPage) page = 1;


            int start = (page - 1) * records_at_page;
            int end = records_at_page;

            bool EducationIsExist = (vSearch.education != "all") ? _context.Education.Any(cus => cus.Id == vSearch.education) : false;
            bool WorkIsExist = (vSearch.sector != "all") ? _context.Sector.Any(cus => cus.Id == vSearch.sector) : false;

            IQueryable<AppUser> query = _context.AppUser;

            if (EducationIsExist)
                query = query.Where(e => e.EducationId == vSearch.education);

            if (WorkIsExist)
                query = query.Where(e => e.SectorId == vSearch.sector);

            query = query.OrderByDescending(o => o.LastActive).Skip(start).Take(end);

            var result = query.Select(objUser => new VProfile
            {
                username = objUser.UserName,

                about = (objUser.AboutMe.Length > 40) ? objUser.AboutMe.Substring(0, 80) + "..." : objUser.AboutMe,
                country = objUser.CountryId,
                home = objUser.HomeId,
                personality = objUser.PersonalityId,
                // seeking = objUser.SeekingId,
                online = objUser.Online,
                hobbies = _context.UserHobbies.Where(o => o.AppUserId == objUser.Id).Select(r => r.HobbiesId).ToList(),
                age = objUser.AgeId,
                gender = objUser.GenderId,
                height = objUser.HeightId,
                //have_kids = objUser.HavekidsId,
                //looking = objUser.SearchFor,
                education = objUser.EducationId,
                relationship = objUser.RelationshipId,
                name = objUser.Name,
                family_values = objUser.FamilyValuesId,
                //relocate = objUser.RelocateId,
                //polygamy_opinion = objUser.PolygamyOpinionId,
                smoking = objUser.SmokingId,
                sector = objUser.SectorId,
                driver = objUser.DriverId,
                work = objUser.WorkId,
                salary = objUser.SalaryId,
                book = objUser.BookId,
                ActiveAgo = TimeAgoStatic(objUser.LastActive).Item1,

                ActiveNumber = TimeAgoStatic(objUser.LastActive).Item2,                //want_kids = objUser.WantKidsId,
                zodiac = objUser.ZodiacId,
                image = objUser.Image,
                id = objUser.Id,
            });
            return result;
        }

        public async Task<VProfile> GetById(int UserId)
        {
            var std = await _context.AppUser.SingleOrDefaultAsync(x => x.Id == UserId);
            if(std == null) return null;

            return FillProfile(std);

        }
        public   IEnumerable<Stamp> GetStamps()
        {
            var stamps =  _context.Stamp.ToList();
            return stamps;

        }




        public IEnumerable<VMessage> GetAllMessages()//long currentId
        {
            Random rand = new Random();
            int toSkip = rand.Next(0, _context.PublicMessages.Count() );
            //if(toSkip == 0) return null;
            var result = _context.PublicMessages.Where(i=> i.ArrivalDate < DateTime.UtcNow.AddDays(7))//.Skip(toSkip)
                  .OrderByDescending(i => i.Id)
                .Take(8)
                .Select(p=> new VMessage
                {
                    Id = p.Id,
                    Content = (p.Content.Length > 180) ? p.Content.Substring(0, 280) + "..." : p.Content,

                    StampId = p.StampId,
                    SenderName =p.Sender.Name,
                    SenderImage = p.Sender.Image,
                    SenderCountry = p.Sender.CountryId,
                    Ago = (p.ArrivalDate < DateTime.UtcNow) ? "ago" : "before",
                    MessageAgo = (p.ArrivalDate < DateTime.UtcNow) ? TimeAgoStatic(p.ArrivalDate).Item1 : TimeBeforeStatic(p.ArrivalDate).Item1,
                    MessageNumber = (p.ArrivalDate < DateTime.UtcNow) ? TimeAgoStatic(p.ArrivalDate).Item2 : TimeBeforeStatic(p.ArrivalDate).Item2,
                })
                .ToList();
             toSkip = rand.Next(0, _context.Messages.Count());

            var resultMessage = _context.Messages.Where(i=>!i.IsPublic && i.PublicMessageId == null && i.ArrivalDate < DateTime.UtcNow.AddDays(7))//.Skip(toSkip)  // && i.ArrivalDate > DateTime.UtcNow.AddDays(3)
               .OrderByDescending(i => i.Id)
                .Take(22)
                .Select(p => new VMessage
                {
                    
                    Id = p.Id,
                    Content = (p.Content.Length > 180) ? p.Content.Substring(0, 180) + "..." : p.Content,
                    IsPublic = p.IsPublic,
                    StampId = p.StampId,
                    SenderName = "private_message" ,//p.Sender.Name,
                    SenderImage = p.Sender.Image,
                    SenderCountry = p.Sender.CountryId,
                    Ago = (p.ArrivalDate < DateTime.UtcNow) ? "ago" : "before",
                    MessageAgo = (p.ArrivalDate < DateTime.UtcNow) ? TimeAgoStatic(p.ArrivalDate).Item1 : TimeBeforeStatic(p.ArrivalDate).Item1,
                    MessageNumber = (p.ArrivalDate < DateTime.UtcNow) ? TimeAgoStatic(p.ArrivalDate).Item2 : TimeBeforeStatic(p.ArrivalDate).Item2,
                })
                .ToList();
            result.AddRange(resultMessage);
            result.OrderBy(x => Guid.NewGuid());
            return result;
        }

        public IEnumerable<VQuestion> GetQuestions(long currentId)
        {
            var messages = _context.Question
                .Where(m => m.RecipientId == currentId && m.RecipientDeleted == false
                ).OrderBy(m => m.QuestoinSent).Select(o => new VQuestion
                {
                    Id = o.Id,
                    SenderId = o.SenderId,
                    Ask = o.Ask,
                    Answer = o.Answer,
                    Stamp = o.StampId
                }).ToList();

            return messages;
        }


        public VQuestion GetQuestionById(long currentId, string AskId)
        {
            var messages = _context.Question
                .Where(m => m.RecipientId == currentId && m.RecipientDeleted == false && m.Id == AskId
                ).OrderBy(m => m.QuestoinSent).Select(o => new VQuestion
                {
                    Id = o.Id,
                    SenderId = o.SenderId,
                    Ask = o.Ask,
                    Answer = o.Answer,
                    Stamp = o.StampId
                }).FirstOrDefault();

            return messages;
        }

        public   IEnumerable<VMessage>  GetMessagesById(long currentId,long UserId)
        {
            var currentUser = _context.AppUser.Where(p => p.Id == currentId).FirstOrDefault();

            List<Message> _messages = _context.Messages.Where(m => m.RecipientId == currentId 
            && m.DateRead == null
            && m.ArrivalDate < DateTime.UtcNow
            ).ToList();
            if (_messages.Any())
            {
                foreach (var message in _messages)
                {
                    message.DateRead = DateTime.UtcNow;

                    Notification notification = new Notification
                    {
                        AppUserId = UserId,
                        SourceId = currentId,
                        Username = currentUser.UserName,
                        SourceName = currentUser.Name,
                        Name = "read",
                        Content = "new_read",
                        IsRead = false,
                        Url = "/chat/" + currentId
                    };
                   
                    _context.Notifications.Add(notification);
                    _ = _messageHub.SendMessageNew(notification);

                }
                _context.SaveChanges();

            }
           
            var messages = _context.Messages
                    .Where(m => m.RecipientId == currentId && m.RecipientDeleted == false
                            && m.SenderId == UserId
                            || m.RecipientId == UserId
                            && m.SenderId == currentId && m.SenderDeleted == false

                    )
                    //.MarkUnreadAsRead(currentId)
                    .OrderByDescending(m => m.MessageSent).Select(p =>
                    new VMessage
                    {
                        PublicMessageId = p.PublicMessageId,
                        Id = p.Id,
                        StampId = p.StampId,
                        SenderId = p.SenderId,
                        SenderName = p.Sender.Name,
                        SenderImage = p.Sender.Image,
                        SenderCountry = p.Sender.CountryId,
                        Ago = (p.ArrivalDate < DateTime.UtcNow) ? "ago":"before",
                        MessageAgo = (p.ArrivalDate < DateTime.UtcNow) ? TimeAgoStatic(p.ArrivalDate).Item1: TimeBeforeStatic(p.ArrivalDate).Item1,
                        MessageNumber = (p.ArrivalDate < DateTime.UtcNow) ? TimeAgoStatic(p.ArrivalDate).Item2 : TimeBeforeStatic(p.ArrivalDate).Item2,
                        Content = (p.ArrivalDate < DateTime.UtcNow) ? p.Content : "onway",
                        DateRead = p.DateRead
                    }

                    ).ToList();

         

            //var newMessage = new VNewMessage { 
            //    SenderId = currentId,s
            //    RecipinetUsername = userData.UserName,
            //Content =data.Content,
            //RecipientId=UserId};



            return messages;
           

        }

        public VMessage OpenMessage(VSecret vMessage,long UserId)
        {

            var result = _context.Messages.Where(i => i.Id == vMessage.Id && i.Secret == vMessage.Secret.ToString())
                .ProjectTo<VMessage>(_mapper.ConfigurationProvider).FirstOrDefault(); //i.Secret == vMessage.Secret.ToString().FirstOrDefault();
          //  _context.UserMessage.Add(new UserMessage { MessageId = vMessage.Id, UserId = UserId, Key = vMessage.Secret.ToString() });

            //_context.SaveChanges();
            
           //     .ProjectTo<VMessage>(_mapper.ConfigurationProvider).FirstOrDefault(); //i.Secret == vMessage.Secret.ToString()

            return result ?? null;

        }
        public VMessage GetMessage(string msgId,long CurrenId)
        {
            var result = _context.Messages.Where(i => i.Id == msgId && (i.RecipientId == CurrenId || i.SenderId == CurrenId) ).ProjectTo<VMessage>(_mapper.ConfigurationProvider).FirstOrDefault();

            return result;

        }
        public bool AnswerQuestionById(VQuestion data, long currentId, string askId)
        {

            var currentUser = _context.AppUser.Where(o => o.Id == currentId).SingleOrDefault();
            var question = _context.Question.Where(o => o.Id == askId && o.RecipientId == currentId ).SingleOrDefault();
            question.Answer = data.Answer;
             _context.SaveChanges();


            Notification notification = new Notification
            {
                AppUserId = question.SenderId,
                SourceId = currentId,
                Username = currentUser.UserName,
                SourceName = currentUser.Name,
                Name = "answer",
                Content = "new_answer",
                IsRead = false,
                Url = "/" + currentId
            };
            _context.Notifications.Add(notification);
            _context.SaveChanges();

            //var newMessage = new VNewMessage { 
            //    SenderId = currentId,s
            //    RecipinetUsername = userData.UserName,
            //Content =data.Content,
            //RecipientId=UserId};

            _ = _messageHub.SendMessageNew(notification);

            return true;
        }
        public async Task<bool> SendQuestionById(VQuestion data, long currentId, long UserId)
        {

            var currentUser = _context.AppUser.Where(o => o.Id == currentId).SingleOrDefault();

            var userData = _context.AppUser.Where(o => o.Id == UserId).SingleOrDefault();
            var question = new Question
            {
                SenderId = currentId,
                RecipientId = UserId,
                Ask = data.Ask,
                Answer = data.Answer,
                Stamp = _context.Stamp.FirstOrDefault(r => r.Id == data.Stamp),


            };

            await _context.Question.AddAsync(question);
            await _context.SaveChangesAsync();
            Notification notification = new Notification
            {
                AppUserId = UserId,
                SourceId = currentId,
                Username = userData.UserName,
                SourceName = currentUser.Name,
                Name = "question",
                Content = "new_question",
                IsRead = false,
                Url = "/" + currentId
            };
            _context.Notifications.Add(notification);
            _context.SaveChanges();

            //var newMessage = new VNewMessage { 
            //    SenderId = currentId,s
            //    RecipinetUsername = userData.UserName,
            //Content =data.Content,
            //RecipientId=UserId};

            _ = _messageHub.SendMessageNew(notification);

            return true;

        }


        //public async Task<bool> SendNewBoardMessage(VBoardMessage data, long currentId)
        //{

        //    var currentUser = _context.AppUser.Where(o => o.Id == currentId).SingleOrDefault();

        //    var userData = _context.AppUser.Where(o => o.Id == UserId).SingleOrDefault();
        //    var boardMessage = new BoardMessage
        //    {
        //        SenderId = currentId,
        //        Content = data.Content,
        //        Stamp = _context.Stamp.FirstOrDefault(r => r.Id == data.Stamp),


        //    };

        //    await _context.Question.AddAsync(question);
        //    await _context.SaveChangesAsync();
        //    Notification notification = new Notification
        //    {
        //        AppUserId = UserId,
        //        SourceId = currentId,
        //        Username = userData.UserName,
        //        SourceName = currentUser.Name,
        //        Name = "question",
        //        Content = "new_question",
        //        IsRead = false,
        //        Url = "/ask/" + currentId
        //    };
        //    _context.Notifications.Add(notification);
        //    _context.SaveChanges();

        //    //var newMessage = new VNewMessage { 
        //    //    SenderId = currentId,s
        //    //    RecipinetUsername = userData.UserName,
        //    //Content =data.Content,
        //    //RecipientId=UserId};

        //    _ = _messageHub.SendMessageNew(notification);

        //    return true;

        //}
        public async Task<bool> SendMessagesByPublic(VCreateMessage data,long currentId)
        {
            var currentUser = _context.AppUser.Where(o => o.Id == currentId).SingleOrDefault();
            Random rand = new Random();
            int toSkip = rand.Next(0, _context.Users.Count() -4);

            var result = _context.Users.Where(o => o.Id != currentId).Skip(toSkip)
                .Take(4).ToList();

            var publicMessage = new PublicMessage
            {
                SenderId = currentId,
                Content = data.Content,
                Stamp = _context.Stamp.FirstOrDefault(r => r.Id == data.Stamp),
                ArrivalDate = DateTime.Now.ToUniversalTime().AddHours(3)
            };

              _context.PublicMessages.Add(publicMessage);
            


            foreach (var item in result)
            {


                GroupMessages groupMessage = _context.GroupMessages.Where(o => (o.FirstUserId == currentId && o.SecondUserId == item.Id) ||
                (o.SecondUserId == currentId && o.FirstUserId == item.Id)
                ).SingleOrDefault();

                if (groupMessage == null)
                {
                    groupMessage = new GroupMessages();

                    groupMessage.FirstUserId = currentId;
                    groupMessage.SecondUserId = item.Id;
                    groupMessage.LastUpdated = DateTime.UtcNow.AddHours(3);

                    _context.GroupMessages.Add(groupMessage);
                }
                else
                {
                    groupMessage.LastUpdated = DateTime.UtcNow.AddHours(3);

                    _context.SaveChanges();
                }
                var message = new Message
                {
                    PublicMessageId = publicMessage.Id,
                    SenderId = currentId,
                    RecipientId = item.Id,
                    Content = data.Content,
                    Stamp = _context.Stamp.FirstOrDefault(r => r.Id == data.Stamp),
                    Secret = data.Secret.ToString(),
                    CountChar = data.CountChar.ToString(),
                    GroupMessageId=groupMessage.Id,
                    ArrivalDate = DateTime.Now.ToUniversalTime().AddHours(3)
                    
                };

                await _context.Messages.AddAsync(message);
                await _context.SaveChangesAsync();
                Notification notification = new Notification
                {
                    AppUserId = item.Id,
                    SourceId = currentId,
                    Username = item.UserName,
                    SourceName = currentUser.Name,
                    Name = "message",
                    Content = "new_message",
                    IsRead = false,
                    Url = "/chat/" + currentId
                };
                _context.Notifications.Add(notification);
                _context.SaveChanges();


                _ = _messageHub.SendMessageNew(notification);


            }
            return true;

        }
        public async Task<bool> SendMessagesById(VCreateMessage data,long currentId, long UserId)
        {

            var currentUser = _context.AppUser.Where(o => o.Id == currentId).SingleOrDefault();

            var userData = _context.AppUser.Where(o => o.Id == UserId).SingleOrDefault();

            if (userData == null)
                return false;

            GroupMessages groupMessage = _context.GroupMessages.Where(o => (o.FirstUserId == currentId && o.SecondUserId == userData.Id) ||
            (o.SecondUserId == currentId && o.FirstUserId == userData.Id)
            ).SingleOrDefault();

            if(groupMessage == null)
            {
                groupMessage = new GroupMessages();
                groupMessage.FirstUserId = currentId;
                groupMessage.SecondUserId = UserId;
                groupMessage.LastUpdated = DateTime.UtcNow.AddHours(3);
                _context.GroupMessages.Add(groupMessage);
            }
            else
            {
                groupMessage.LastUpdated = DateTime.UtcNow.AddHours(3);
                _context.SaveChanges();
            }
            var message = new Message
            {
                GroupMessageId= groupMessage.Id,
                SenderId = currentId,
                RecipientId = UserId,
                Content = data.Content,
                Stamp = _context.Stamp.FirstOrDefault(r=>r.Id == data.Stamp),
                Secret = data.Secret.ToString(),
                CountChar = data.CountChar.ToString(),
                ArrivalDate = DateTime.Now.ToUniversalTime().AddHours(3)

            };

            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            Notification notification = new Notification { AppUserId = UserId,
                SourceId = currentId,
                Username = userData.UserName,
                SourceName = currentUser.Name,
                Name = "message",
                Content = "new_message",
                IsRead = false,
                Url = "/chat/" + currentId 
            };
            _context.Notifications.Add(notification);
            _context.SaveChanges();

            //var newMessage = new VNewMessage { 
            //    SenderId = currentId,s
            //    RecipinetUsername = userData.UserName,
            //Content =data.Content,
            //RecipientId=UserId};

            _ = _messageHub.SendMessageNew(notification);

            return  true;

        }
        public bool addLikeUser(long currentId,long userId)
        {

            var currentUser = _context.AppUser.Where(o => o.Id == currentId).SingleOrDefault();
            var updateUser = _context.AppUser.Where(i => i.Id == userId).FirstOrDefault();
            updateUser.LikeCount++;

            //_context.SaveChangesAsync();
            UserLike result = _context.Likes.Where(i => i.LikedUserId == userId && i.SourceUserId == currentId).FirstOrDefault();
            if (result == null)
            {
                _context.Likes.Add(new UserLike { LikedUserId = userId, SourceUserId = currentId, LikedDate = DateTime.UtcNow });
            }
            else
            {
                result.LikedDate = DateTime.UtcNow;
            }
            Notification notification = new Notification
            {
                AppUserId = userId,
                SourceId = currentId,
                Username = updateUser.UserName,
                SourceName = currentUser.Name,
                Name = "like",
                Content = "new_like",
                IsRead = false,
                Url = "/" + currentId
            };

            _context.Notifications.Add(notification);
            _context.SaveChanges();
            _ = _messageHub.SendMessageNew(notification);
            return true;
        }

        public static (string, string) TimeBeforeStatic(DateTime dateTime)
        {
            (string, string) result = (string.Empty, string.Empty);
            var timeSpan = dateTime.Subtract(DateTime.Now);

            //if (timeSpan <= TimeSpan.FromSeconds(60))
            //{
            //    result = string.Format("{0} seconds ago", timeSpan.Seconds);
            //}
            if (timeSpan <= TimeSpan.FromMinutes(60))
            {
                result = timeSpan.Minutes > 1 ?

                ("minutes_ago", (timeSpan.Minutes).ToString()) :

                ("minute_ago", "1");
            }
            else if (timeSpan <= TimeSpan.FromHours(24))
            {
                result = timeSpan.Hours > 1 ?
           ("hours_ago", (timeSpan.Hours).ToString()) :

                ("hour_ago", "1");
            }
        
        return result;
        }
            public static (string, string) TimeAgoStatic(DateTime dateTime)
        {
            (string, string) result = (string.Empty, string.Empty);
            var timeSpan = DateTime.Now.Subtract(dateTime);

            //if (timeSpan <= TimeSpan.FromSeconds(60))
            //{
            //    result = string.Format("{0} seconds ago", timeSpan.Seconds);
            //}
            if (timeSpan <= TimeSpan.FromMinutes(60))
            {
                result = timeSpan.Minutes > 1 ?

                ("minutes_ago", (timeSpan.Minutes).ToString()) :

                ("minute_ago", "1");
            }
            else if (timeSpan <= TimeSpan.FromHours(24))
            {
                result = timeSpan.Hours > 1 ?
           ("hours_ago", (timeSpan.Hours).ToString()) :

                ("hour_ago", "1");
            }
            else if (timeSpan <= TimeSpan.FromDays(30))
            {
                result = timeSpan.Days > 1 ?
                   ("days_ago", (timeSpan.Days).ToString()) :

                ("day_ago", "1");
            }
            else if (timeSpan <= TimeSpan.FromDays(365))
            {
                result = timeSpan.Days > 30 ?
                    ("months_ago", (timeSpan.Days / 30).ToString()) :

                ("month_ago", "1");
            }
            else
            {
                result = timeSpan.Days > 365 ?
                    ("years_ago", (timeSpan.Days / 365).ToString()) :
                    ("year_ago", "1");
            }

            return result;
        }
        public  (string,string) TimeAgo( DateTime dateTime)
        {
            (string, string) result = (string.Empty, string.Empty);
            var timeSpan = DateTime.Now.Subtract(dateTime);

            //if (timeSpan <= TimeSpan.FromSeconds(60))
            //{
            //    result = string.Format("{0} seconds ago", timeSpan.Seconds);
            //}
             if (timeSpan <= TimeSpan.FromMinutes(60))
            {
                result = timeSpan.Minutes > 1 ?
           
                ("minutes_ago", (timeSpan.Minutes).ToString()) :

                ("minute_ago", "1");
            }
            else if (timeSpan <= TimeSpan.FromHours(24))
            {
                result = timeSpan.Hours > 1 ?
           ("hours_ago", (timeSpan.Hours).ToString()) :

                ("hour_ago", "1");
            }
            else if (timeSpan <= TimeSpan.FromDays(30))
            {
                result = timeSpan.Days > 1 ?
                   ("days_ago", (timeSpan.Days).ToString()) :
                   
                ("day_ago", "1");
            }
            else if (timeSpan <= TimeSpan.FromDays(365))
            {
                result = timeSpan.Days > 30 ?
                    ("months_ago", (timeSpan.Days / 30).ToString()) :
                
                ("month_ago", "1");
            }
            else
            {
                result = timeSpan.Days > 365 ?
                    ("years_ago", (timeSpan.Days / 365).ToString()) :
                    ("year_ago","1");
            }

            return result;
        }
    }
}
