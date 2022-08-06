
using MyLetterStable.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using SystemData;
using SystemData.Models;
  

namespace MyLetterStable.Services
{
    public interface IAuthService
    {

        Task<VUser> FacebookAuthFunc(string AccessToken);
 
        Task<VUser> GmailAuthFunc(string AccessToken);
        Task<VUser> CreateToken(AppUser appUser);

    }

    public class AuthService : IAuthService
    {
        private SystemContext _context;

        private readonly JwtIssuerOptions _jwtOptions;
        private readonly FacebookAuthSettings _fbAuthSettings;
        private static readonly HttpClient Client = new HttpClient();
        private readonly AppSettings _appSettings;
        private readonly UserManager<AppUser> _mUserManager;
        private readonly SignInManager<AppUser> _mSignInManager;
        public AuthService(IOptions<AppSettings> appSettings , SystemContext context, UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, IOptions<JwtIssuerOptions> jwtOptions, IOptions<FacebookAuthSettings> fbAuthSettingsAccessor)
        {
            _appSettings = appSettings.Value;
            _context = context;
            _mUserManager = userManager;
            _mSignInManager = signInManager;
            _jwtOptions = jwtOptions.Value;
            _fbAuthSettings = fbAuthSettingsAccessor.Value;
 


        }


     
        public async Task<VUser> FacebookAuthFunc(string AccessToken)
        {
        
                // 1.generate an app access token
                var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_fbAuthSettings.AppId}&client_secret={_fbAuthSettings.AppSecret}&grant_type=client_credentials");
                var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);
                // 2. validate the user access token
                var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={AccessToken}&access_token={appAccessToken.AccessToken}");
                var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

                if (!userAccessTokenValidation.Data.IsValid)
                {
                    return null;
                }
          
            var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v12.0/me?fields=id,first_name&access_token={AccessToken}");
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

            var faceId = "f"+userInfo.Id.ToString();
            var emailId = faceId; //(userInfo.Email.IsNullOrEmpty()) ?: userInfo.Email;
            var user = await _context.Users.Where(u=>u.UserName == emailId).FirstOrDefaultAsync();

            if (user == null)
            {
                var maleImagePath = "_default-male.svg";
                var appUser = new AppUser
                {
                    Name = userInfo.FirstName,
                    Image = maleImagePath,
                    Password = faceId,
                    FacebookId = userInfo.Id,
                    Email = emailId,
                    UserName = faceId,
                };

                var result = await _mUserManager.CreateAsync(appUser, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8));

                if (!result.Succeeded) return null;

              
            }

        
            var Objuser = await _mUserManager.FindByNameAsync(faceId);
            var objResult = await CreateToken(Objuser);

            return objResult;
        }

        public async Task<VUser> GmailAuthFunc(string AccessToken)
        {

            GoogleUserOutputData serStatus = null;
            try
            {
                HttpClient client = new HttpClient();
                client.CancelPendingRequests();
                HttpResponseMessage output = await Client.GetAsync($"https://www.googleapis.com/oauth2/v1/userinfo?access_token={AccessToken}");

                if (output.IsSuccessStatusCode)
                {
                    string outputData = await output.Content.ReadAsStringAsync();
                    serStatus = JsonConvert.DeserializeObject<GoogleUserOutputData>(outputData);

                    if (serStatus == null)
                    {
                        return null;
                        // You will get the user information here.
                    }
                }
            }
            catch (Exception ex)
            {
                //
            }

            var user = await _mUserManager.FindByEmailAsync(serStatus.email);

            if (user == null)
            {
                var pass = Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8);
                var maleImagePath = "_default-male.svg"; 

                var appUser = new AppUser
                {

                    Image = maleImagePath,
                    Name = serStatus.name,
                    GmailId = serStatus.id,
                    Email = serStatus.email,
                    UserName = serStatus.id,
                    Password = pass,
                };

                IdentityResult result = await _mUserManager.CreateAsync(appUser, pass);
           
                if (!result.Succeeded) return null;


            }
            var Objuser = await _mUserManager.FindByEmailAsync(serStatus.email);

            return await CreateToken(Objuser); // await GenerateJwt(Objuser);

        }
        public async Task<VUser> CreateToken(AppUser user)
        {

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
               new Claim(JwtRegisteredClaimNames.Name, user.UserName),

            };

            var roles = await _mUserManager.GetRolesAsync(user);
            SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Secret));

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var creds = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires =  DateTime.Now.ToUniversalTime().AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var writeToken = tokenHandler.WriteToken(token);

            int likes = _context.Notifications.Count(p => p.AppUserId == user.Id && !p.IsRead && !p.Name.Contains("message"));
            int messages = _context.Notifications.Count(p => p.AppUserId == user.Id && !p.IsRead && p.Name.Contains("message"));
            return new VUser
            {
                Id = user.Id,
                Message = "تم تسجيل الدخول بنجاح",
                UserId = user.Id,
                Likes = likes,
                Messages = messages,
                Name = user.Name,
                UserName = user.UserName,
                Token = writeToken,
                Country = user.CountryId,
                Gender = user.GenderId,
                Image = user.Image

            };

        }
        public VUser GenerateJwt(AppUser objUser)
        {
            if (objUser == null)
                return null;


            var claims = new[]
                          {
                    new Claim(ClaimTypes.Name,objUser.UserName),
                    new Claim(ClaimTypes.Email,objUser.Email),
                    new Claim(ClaimTypes.Sid,objUser.Id.ToString()),

                     new Claim("Gender",objUser.GenderId.ToString()),
                     new Claim("UserId",objUser.Id.ToString()),

                };



            SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Secret));

            var token = new JwtSecurityToken(
              issuer: _jwtOptions.Issuer,
              audience: _jwtOptions.Audience,
              claims: claims,
              expires: DateTime.Now.ToUniversalTime().AddDays(200),
                           signingCredentials: new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256)
);

            objUser.Token = new JwtSecurityTokenHandler().WriteToken(token);
            _context.Entry(objUser).Property("Token").IsModified = true;
            _context.AppUser.Update(objUser);


            return new VUser
            {
                Message = "تم تسجيل الدخول بنجاح",
                UserId = objUser.Id,
                Name = objUser.Name,
                UserName = objUser.UserName,
                Token = objUser.Token,
                Gender = objUser.GenderId,
                Image = objUser.Image

            };
        }

    }
}
