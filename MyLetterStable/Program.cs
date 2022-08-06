using MyLetterStable.Seed;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using SystemData;
using SystemData.Models;

namespace MyLetterStable
{
    public class Program
    {
        public static void Main(string[] args)
        {

            /*     var host = new WebHostBuilder()
      .UseContentRoot(Directory.GetCurrentDirectory())
      .UseKestrel()
      .UseIISIntegration()
      .UseStartup<Startup>()

      .Build();

             host.Run();*/
            IWebHost host = BuildWebHost(args);

            using (IServiceScope scope = host.Services.CreateScope())
            {
                IServiceProvider services = scope.ServiceProvider;
                SystemContext context = services.GetRequiredService<SystemContext>();

                var manager = scope.ServiceProvider.GetService<UserManager<AppUser>>();
                var roleManager = scope.ServiceProvider.GetService<RoleManager<AppRole>>();

                try
                {
                    SeedData.Initialize(serviceProvider: services);
                    SeedData.SeedUsers(services, manager, roleManager).Wait();
                }
                catch (Exception ex)
                {
                    ILogger<Program> logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred seeding the DB.");
                }
            };
            host.Run();
        }


        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>()


            .Build();
    }
}
