using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using MyLetterStable.Model;
using MyLetterStable.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SystemData;
using SystemData.Models;

namespace MyLetterStable.Extensions
{
    public static class IdentityServiceExtensions
    {
        private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure

        public static IServiceCollection AddIdentityServices(this IServiceCollection services, 
            IConfiguration config)
        {

            var appSettingsSection = config.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(appSettings.Secret));

           //  ===== Add Jwt Authentication ========
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims
            services.Configure<FacebookAuthSettings>(config.GetSection(nameof(FacebookAuthSettings)));

            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireDigit = false;

            })
                  .AddRoles<AppRole>()
                  .AddRoleManager<RoleManager<AppRole>>()
                  .AddSignInManager<SignInManager<AppUser>>()
                  .AddRoleValidator<RoleValidator<AppRole>>()
                  .AddEntityFrameworkStores<SystemContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = _signingKey,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];

                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) &&
                                path.StartsWithSegments("/hubs"))
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        }
                    };
                }).AddFacebook(facebookOptions =>
                {
                    facebookOptions.AppId = config["FacebookAuthSettings:AppId"];
                    facebookOptions.AppSecret = config["FacebookAuthSettings:AppSecret"];
                });

          

            return services;
        }
    }
}