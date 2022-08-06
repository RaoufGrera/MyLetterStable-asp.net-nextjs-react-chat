using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Quartz;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using SystemData.Models;
using SystemData;

namespace MyLetterStable
{
    public class Task1 : IJob
    {

        protected SystemContext _context;
        public Task1(SystemContext context)
        {
            _context = context;
        }

        public Task Execute(IJobExecutionContext context)
        {
            var task = Task.Run(() => logfile(DateTime.Now)); ;
            return task;
        }
        public async void  logfile(DateTime time)
        {
            //string path = "C:\\log\\sample.txt";
            //using (StreamWriter writer = new StreamWriter(path, true))
            //{
            //    writer.WriteLine(time);
            //    writer.Close();
            //}
            var _messages = (from m in _context.Messages join u in _context.Users on m.RecipientId equals u.Id
                             where u.FcmToken != "" && m.DateRead == null select u.FcmToken).ToList();
            if (_messages.Any()) { 
            
           
                var defaultApp = FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "key.json")),
            });
                // Console.WriteLine(defaultApp.Name); // "[DEFAULT]"

                foreach(var item in _messages)
                {
                    var message = new FirebaseAdmin.Messaging.Message()
                    {
                        Data = new Dictionary<string, string>()
                        {
                            ["FirstName"] = "John",
                            ["LastName"] = "Doe",
                            ["locator"] = "https://libyacv.com"
                        },
                        Webpush = new WebpushConfig()
                        {
                            Notification = new WebpushNotification()
                            {
                                Title = "My Title",
                                Body = "My Body",

                                Icon = "https://www.libyacv.com/images/simple/libyacv_logo.png"
                            },
                        },
                        //Token = "eh0zrORtQrfqxaKV-DLNHV:APA91bHVl_XXGA_oSxS1oRRyEOCJbmLYa2BfGt03n1dNA5pNk2APMwy-SlSu3XhtbkT35qj4SJXEjkgVeXHfWswqclrIYiVAIj7fqO2vwwXQBMPCpuc2p6Tqa9dnPN94gDS9biqgklHz",
                        // Topic = "news"
                    };
                    var messaging = FirebaseMessaging.DefaultInstance;
                    var result = await messaging.SendAsync(message);
                }
            string path = "C:\\log\\sample.txt";
            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(time);
                writer.Close();
            }
            }
        }
    }
}