using System;
using MyLetterStable.Helpers;
using MyLetterStable.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SystemData;
using MyLetterStable.SignalR;

namespace MyLetterStable.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddMvc();

            services.AddSingleton<PresenceTracker>();
       
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserServices, UserService>();
            services.AddScoped<MessageHub>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);




            return services;
        }
    }
}