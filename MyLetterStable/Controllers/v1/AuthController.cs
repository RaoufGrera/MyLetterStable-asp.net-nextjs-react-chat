using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using MyLetterStable.Enums;
using MyLetterStable.Services;
using MyLetterStable.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SystemData;
using SystemData.Models;
using System.IO;
using System.Net.Http.Headers;
using HeyRed.Mime;
using MyLetterStable.Extensions;

namespace MyLetterStable.Controllers.v1
{
    [Route("v1/[controller]")]
    public class AuthController : ControllerBase
    {
        public IAuthService _authService;
        protected SystemContext _context;
        protected UserManager<AppUser> mUserManager;


        public AuthController(SystemContext context,
            UserManager<AppUser> userManager,

            IAuthService authService

           )
        {
            _authService = authService;
            _context = context;
            mUserManager = userManager;

        }


        [AllowAnonymous]
        [HttpPost("facebookAuth")]
        public IActionResult FacebookAuth([FromBody] string accessToken)
        {

            var user = _authService.FacebookAuthFunc(accessToken);

            if (user.Result == null)
                return BadRequest(new { message = "خطاء اثناء تسجيل الدخول" });

            return Ok(user.Result);

        }

    


        [AllowAnonymous]
        [HttpPost("googleAuth")]
        public IActionResult GoogleAuth([FromBody] string accessToken)
        {
            var user = _authService.GmailAuthFunc(accessToken);
            if (user.Result == null)
                return BadRequest(new { message = "خطاء اثناء تسجيل الدخول" });

            return Ok(user.Result);

        }

        
        [Authorize]
        [HttpPost("delete")]
        public IActionResult deleteAccount()
        {
            long currentId = User.GetUserId();

         
            
            var itemToRemove = _context.Users.SingleOrDefault(x => x.Id == currentId); //returns a single item.

            if (itemToRemove != null)
            {
                _context.Users.Remove(itemToRemove);
                _context.SaveChanges();
            }

            return Ok();

        }

        [Authorize]
        [HttpGet("chats")]
        public IEnumerable<VUser> GetChats()
        {

            long currentId = User.GetUserId();
            var result = _context.GroupMessages
                                     .Where(m => m.FirstUserId == currentId || m.SecondUserId == currentId )
                                     .Select(u => new VUser { 

                               Name   = (u.SecondUserId == currentId) ? u.FirstUser.Name : u.SecondUser.Name,
                               UserName = (u.SecondUserId == currentId) ? u.FirstUser.UserName : u.SecondUser.UserName,
                                Image = (u.SecondUserId == currentId) ? u.FirstUser.Image : u.SecondUser.Image,
                                         Id = (u.SecondUserId == currentId) ? u.FirstUser.Id : u.SecondUser.Id,
                                         IsReceived = (u.LastUpdated < DateTime.UtcNow),

                                         MessageSent = u.LastUpdated

                                     })
                                      .OrderByDescending(c => c.MessageSent)

                                      .ToList();

            if (result == null)
                return null;
           
 

            return result;
        }

     



        [HttpGet("filter")]
        public VFilter GetFilter()
        {

            var home = _context.Home.ToList();
            var sectors = _context.Sector.ToList();

            var educations = _context.Education.ToList();

            VFilter vFilter = new VFilter {home= home, secotr = sectors, education =educations };
            return vFilter;
           
        }


        [Authorize]
        [HttpGet("Test")]
        public IActionResult Test()
        {
            var userName = User.Identity.Name;
            var OfficeId = ((ClaimsIdentity)User.Identity).Claims.FirstOrDefault(x => x.Type == "OfficeId").Value;

            return Ok($"Super secret content, I hope you've got clearance for this {userName}..OfficeId: .{OfficeId}");
        }

        




    }
}