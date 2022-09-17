using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SystemData;
using Microsoft.OpenApi.Models;
using System;
using Microsoft.EntityFrameworkCore;
using MyLetterStable.Services;
using MyLetterStable.Extensions;
using MyLetterStable.SignalR;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.SpaServices.Extensions;
using Microsoft.Extensions.FileProviders;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace MyLetterStable
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            SchedulerTask.StartAsync().GetAwaiter().GetResult();
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
     

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews(options =>
    options.ModelBinderProviders.RemoveType<DateTimeModelBinderProvider>());
            services.AddDbContext<SystemContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddApplicationServices(config: Configuration);
            services.AddIdentityServices(Configuration);
            services.AddSignalR();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Myletter API",
                    Version = "v1",
                    Description = "...",
                    Contact = new OpenApiContact
                    {
                        Name = "RGH",
                        Email = string.Empty,
                        Url = new Uri("https://libyacv.com/"),
                    },
                });
            });



        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            SystemContext con = (SystemContext)serviceProvider.GetService(typeof(SystemContext));
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);


           

            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = ctx =>
                {
                    ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "https://myletter.app");
                    ctx.Context.Response.Headers.Append("Access-Control-Allow-Headers",
                      "*");
                },

            });


            if (env.IsDevelopment())
            {
                app.UseCors(x => x.AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
                .WithOrigins("http://localhost:3000", "https://localhost:3000"));

                app.UseCors("AllowAll");
            }
            app.UseSwaggerAuthorized();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "myletter API V1");
                c.RoutePrefix = "";
            });
            app.UseCors(x => x.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithOrigins("https://myletter.app"));
            app.UseCors("AllowAll"); 




            app.UseHttpsRedirection();

            app.UseRouting();
     
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<PresenceHub>("hubs/presence");
                endpoints.MapHub<MessageHub>("hubs/message");

            });

  



        }
    }
}
