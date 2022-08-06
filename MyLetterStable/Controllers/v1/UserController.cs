using MyLetterStable.Extensions;
using MyLetterStable.Model;
using MyLetterStable.Model.Data;
using MyLetterStable.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using SystemData;
using SystemData.Models;

namespace MyLetterStable.Controllers.v1
{
    [Route("v1/[controller]")]
    public class UserController : Controller
    {

        public IUserServices _userService;
        protected SystemContext _context;
        public UserController(SystemContext context,IUserServices userService )
        {
            _userService = userService;
            _context = context;
        }


        // [Authorize]
        [HttpGet]
        [Route("profile/{userId}")]
        public IActionResult GetById(int userId)
        {
            var user = _userService.GetById(userId);
            if(user.Result == null)
                return NotFound();
            return Ok(user.Result);

        }

        [Authorize]
        [HttpGet] //done chat
        [Route("chat/{userId}/{msgId}")]

        public VMessage getMessage(long userId,string msgId)
        {


            long currentId = User.GetUserId();
            var open = _userService.GetMessage(msgId, currentId);

            return open;
        }


        [Authorize]
        [HttpGet] //que
        [Route("chat/ask/{askId}")]

        public VQuestion getAskById(string askId)
        {
            long currentId = User.GetUserId();
            var open = _userService.GetQuestionById(currentId, askId);
            return open;
        }
        [Authorize]
        [HttpGet] // que
        [Route("chat/asks/{id}")]

        public IActionResult getAsks(long id)
        {
            var user = _userService.GetQuestions(id);

            return Ok(user);
        }
        [Authorize]
        [HttpPost]// que
        [Route("chat/answer/{askId}")]
        public IActionResult AnswerQuestionToId([FromBody] VQuestion data, string askId)
        {
            long currentId = User.GetUserId();

            var user = _userService.AnswerQuestionById(data, currentId, askId);
            // var mm = new MainFields() { Age = { Options = _context.Age.Select(e => new SortedList<string, string>() { { e.Id, e.Name } }).ToList(), Label = "fff", } };

            return Ok(user);//user.Result

        }

        [Authorize]
        [HttpGet]
        [Route("like/{userId}")]

        public IActionResult likeUser(long userId)
        {
            long currentId = User.GetUserId();
         

            _userService.addLikeUser(currentId, userId);
            return Ok();

        }

       


        [Authorize]
        [HttpGet]
        [Route("chat/{userId}")]
        public IEnumerable<VMessage> GetMessagesById(long userId)
        {
            var currentId = User.GetUserId();

            _context.Notifications.Where(p => p.AppUserId == currentId && p.SourceId == userId && !p.IsRead && p.Name.Contains("message")).ToList().ForEach(e => e.IsRead = true);//e.ReadAt = DateTime.UtcNow.AddHours(2);
            _context.SaveChanges();
            var user = _userService.GetMessagesById(currentId, userId);
            if (user == null)
                return null;
            return user;

        }

        
        [Authorize]
        [HttpPost]
        [Route("chat/{userId}")]
        public IActionResult SendMessageToId([FromBody] VCreateMessage data, long userId)
        {
            long currentId = User.GetUserId();
            if (data.Content.Length < 10)
                return Ok();
            var user = _userService.SendMessagesById(data, currentId, userId);
            if (user.Result == false)
                return NotFound();
            return Ok();//user.Result

        }

        [HttpPost]
        [Route("chat/public")]
        public IActionResult SendMessageToPublic([FromBody] VCreateMessage data)
        {
            long currentId = User.GetUserId();

            var user = _userService.SendMessagesByPublic(data, currentId);
            if (user.Result == false)
                return NotFound();
            return Ok();//user.Result

        }
        [Authorize]
        [HttpPost]
        [Route("chat/ask/{userId}")]
        public IActionResult SendQuestionToId([FromBody] VQuestion data, long userId)
        {
            long currentId = User.GetUserId();

            var user = _userService.SendQuestionById(data, currentId, userId);
            if (user.Result == false)
                return NotFound();
            return Ok();//user.Result

        }

        [HttpGet("users")]
        public IEnumerable<VProfile> GetUsers([FromQuery] VSearch vSearch)
        {

            IEnumerable<VProfile> result = _userService.getUsers(vSearch);

            return result;

           
        }
        //[Authorize]
        //[HttpPost]
        //[Route("board")]
        //public IActionResult SendBoardMessage([FromBody] VBoardMessage data)
        //{
        //    long currentId = User.GetUserId();

        //    var user = _userService.SendQuestionById(data, currentId);
        //    if (user.Result == false)
        //        return NotFound();
        //    return Ok();//user.Result

        //}

        [HttpGet]
        [Route("test2")]
        public string makeFileds(string label,string option,Dictionary<string,string> keyValues)
        {
            return JsonConvert.SerializeObject(
                    new Dictionary<string, string>(){
                {"label",label },{"type",option },
                {"options",JsonConvert.SerializeObject(keyValues)}})
                .Replace(@"\", string.Empty); ;
        }

        [HttpGet]
        [Route("test")]
        public string test()
        {

            

            StaticFields staticFields_ar = new StaticFields()
            {
                about ="عن نفسي",
                age = makeFileds("العمر","option", _context.Age.ToDictionary(kp => kp.Id, kp => kp.Name)),
                sector = makeFileds("المهنة", "option", _context.Sector.ToDictionary(kp => kp.Id, kp => kp.Name)),
                education = makeFileds("المؤهل العلمي", "option", _context.Education.ToDictionary(kp => kp.Id, kp => kp.Name)),
                country = makeFileds("يقيم في", "option", _context.Country.ToDictionary(kp => kp.Id, kp => kp.Name)),
                relationship = makeFileds("الحالة", "option", _context.Relationship.ToDictionary(kp => kp.Id, kp => kp.Name)),
                gender = makeFileds("الجنس", "option", _context.Gender.ToDictionary(kp => kp.Id, kp => kp.Name)),
             //   smoking = makeFileds("التدخين", "option", _context.Smoking.ToDictionary(kp => kp.Id, kp => kp.Name)),
               salary = makeFileds("الراتب", "option", _context.Salary.ToDictionary(kp => kp.Id, kp => kp.Name)),
               // zodiac = makeFileds("الابراج", _context.Zodiac.ToDictionary(kp => kp.Id, kp => kp.Name)),
                personality = makeFileds("الشخصية", "option", _context.Personality.ToDictionary(kp => kp.Id, kp => kp.Name)),
                hobbies = makeFileds("الهويات", "options", _context.Hobbies.ToDictionary(kp => kp.Id, kp => kp.Name)),
            //    book = makeFileds("القرآن", "options", _context.Book.ToDictionary(kp => kp.Id, kp => kp.Name)),

            };

            StaticFields staticFields_en = new StaticFields()
            {
                about = "About me",
                age = makeFileds("Age", "option", _context.Age.ToDictionary(kp => kp.Id, kp => kp.NameEn)),
                sector = makeFileds("Sector", "option", _context.Sector.ToDictionary(kp => kp.Id, kp => kp.NameEn)),
                education = makeFileds("Education", "option", _context.Education.ToDictionary(kp => kp.Id, kp => kp.NameEn)),
                country = makeFileds("Country", "option", _context.Country.ToDictionary(kp => kp.Id, kp => kp.NameEn)),
                relationship = makeFileds("Relationship", "option", _context.Relationship.ToDictionary(kp => kp.Id, kp => kp.NameEn)),
                gender = makeFileds("Gender", "option", _context.Gender.ToDictionary(kp => kp.Id, kp => kp.NameEn)),
              //  smoking = makeFileds("Smoking", "option", _context.Smoking.ToDictionary(kp => kp.Id, kp => kp.NameEn)),
                salary = makeFileds("Salary", "option", _context.Salary.ToDictionary(kp => kp.Id, kp => kp.NameEn)),
               // zodiac = makeFileds("Zodiac", _context.Zodiac.ToDictionary(kp => kp.Id, kp => kp.NameEn)),
                personality = makeFileds("Personality", "option", _context.Personality.ToDictionary(kp => kp.Id, kp => kp.NameEn)),
                hobbies = makeFileds("Hobbies", "options", _context.Hobbies.ToDictionary(kp => kp.Id, kp => kp.NameEn)),
              //  book = makeFileds("Quran", "options", _context.Book.ToDictionary(kp => kp.Id, kp => kp.NameEn)),

            };

            
            var categories = new Dictionary<string, Categories>();
            categories.Add("basic", new Categories { label = "الأساسيات", fields = new List<string> { "gender", "country", "age" } });
            categories.Add("social_status", new Categories { label = "معلومات أولية", fields = new List<string> { "relationship", "sector", "personality", "education", "salary", "hobbies" } });

            var categoriesEn = new Dictionary<string, Categories>();
            categoriesEn.Add("basic", new Categories { label = "Basics", fields = new List<string> {"gender", "country", "age"  } });
            categoriesEn.Add("social_status", new Categories { label = "Essentials", fields = new List<string> { "relationship", "sector",  "personality", "education", "salary",   "hobbies" } });

            var allcategoriesAR = JsonConvert.SerializeObject(categories).Replace(@"\", string.Empty).Replace(@"}""", "}").Replace(@"""{", "{");
            var allcategoriesEN = JsonConvert.SerializeObject(categoriesEn).Replace(@"\", string.Empty).Replace(@"}""", "}").Replace(@"""{", "{");

            var profile_fields = new Dictionary<string, StaticFields>();
            profile_fields.Add("profile_fields", staticFields_ar);
            var fileds_ar = JsonConvert.SerializeObject(profile_fields, Formatting.Indented).Replace(@"\", string.Empty).Replace(@"}""", "}").Replace(@"""{", "{");


            var profile_fieldsEn = new Dictionary<string, StaticFields>();
            profile_fieldsEn.Add("profile_fields", staticFields_en);
            var fileds_en = JsonConvert.SerializeObject(profile_fieldsEn, Formatting.Indented).Replace(@"\", string.Empty).Replace(@"}""", "}").Replace(@"""{", "{");

            //var json = JsonConvert.SerializeObject(staticFields, Formatting.Indented)
            var profile_categories = new Dictionary<string, string>();
            profile_categories.Add("profile_categories", allcategoriesAR);
            allcategoriesAR = JsonConvert.SerializeObject(profile_categories, Formatting.Indented).Replace(@"\", string.Empty).Replace(@"}""", "}").Replace(@"""{", "{");

            var profile_categoriesEn = new Dictionary<string, string>();
            profile_categoriesEn.Add("profile_categories", allcategoriesEN);
            allcategoriesEN = JsonConvert.SerializeObject(profile_categoriesEn, Formatting.Indented).Replace(@"\", string.Empty).Replace(@"}""", "}").Replace(@"""{", "{");


            string path = "C:\\log\\sample.txt";
            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(fileds_ar);
                writer.WriteLine(allcategoriesAR);
                writer.WriteLine("\n -----------------");

                writer.WriteLine(fileds_en);
                writer.WriteLine(allcategoriesEN);

                writer.Close();
            }
            return fileds_ar;
        }
       
   

        [HttpGet]
        [Route("stamps")]
        public IEnumerable<Stamp>  getStamps()
        {

            var result = _userService.GetStamps();
           
            return result;

        }

        //[Authorize]
        [HttpGet]
        [Route("allmsg")]
        public IEnumerable<VMessage> GetMessagesBox()
        {
            // long currentId = User.GetUserId();currentId

            var result = _userService.GetAllMessages();

            return result;

        }


        [Authorize]
        [HttpGet]
        [Route("notification")]
        public IEnumerable<VNoti> GetNotification()
        {

            long currentId = User.GetUserId();

            _context.Notifications.Where(p => p.AppUserId == currentId && !p.IsRead && !p.Name.Contains("message")).ToList().ForEach(e => e.IsRead = true);//e.ReadAt = DateTime.UtcNow.AddHours(2);
            _context.SaveChanges();
            var result =
    (from n in _context.Notifications
    join u in _context.Users on n.SourceId equals u.Id into gj
    from supu in gj.DefaultIfEmpty()
    where n.AppUserId == currentId //&& !n.Name.Contains("message")
     let ago = _userService.TimeAgo(n.CreateAt)
     select new VNoti
    {
        Id = n.Id,
        UserId = n.AppUserId,
        Image = supu.Image ?? n.Image,
        Content = n.Content,
        Name = n.Name,
        Url = n.Url,
        TimeAgo = ago.Item1,
        TimeNumber = ago.Item2,
     }).OrderByDescending(p=>p.Id).ToList();

            

            return result;

        }
        [Authorize]
        [HttpGet]
        [Route("redis")]
        public VRedis NumberOfNotifications()
        {
            long currentId = User.GetUserId();
            int likes = _context.Notifications.Count(p => p.AppUserId == currentId && !p.IsRead);
            int messages = _context.Notifications.Count(p => p.AppUserId == currentId && !p.IsRead && p.Name.Contains("message"));
        
            return new VRedis { Likes = likes, Messages = messages};
            
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult profile()
        {
            var userName = User.GetUsername();
            var user = _userService.Profile(userName);
            if (user == null)
                return StatusCode(500, "Internal server error:profile");

            return Ok(user);
        }

        [Authorize]
        [HttpPost("edit_options")]
        public IActionResult edit([FromBody] VEditOptions data)
        {
           
            return Ok(data);

        }

        [Authorize]
        [HttpPost("edit")]
        public IActionResult edit([FromBody] VEdit data)
        {
            var userName = User.GetUsername();
           
            var user = _userService.Edit(userName, data);
            if (user == null)
               return BadRequest();
            return Ok(user);
           
        }
    

        [Authorize]
        [HttpPost("open")]
        public IActionResult Open([FromBody] VSecret vSecret)
        {
            long currentId = User.GetUserId();
            var open = _userService.OpenMessage(vSecret,currentId);
            if (open == null) return  BadRequest();
            return Ok(open); 
        }

        [Authorize]
        [RequestSizeLimit(400_000)]
        [HttpPost("upload")]
        public async Task<IActionResult> UploadAsync()
        {
            try
            {
                var userName = User.GetUsername();
                IFormCollection formCollection = await Request.ReadFormAsync();
                if (formCollection == null)
                    return BadRequest();

                var user = _userService.UploadImage(userName, formCollection);
                if(user == null)
                    return BadRequest();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
