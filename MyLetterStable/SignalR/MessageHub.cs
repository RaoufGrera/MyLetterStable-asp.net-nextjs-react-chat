using System;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using MyLetterStable.Services;
using SystemData.Models;

namespace MyLetterStable.SignalR
{
    public class MessageHub : Hub
    {
        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly PresenceTracker _tracker;
        public MessageHub(IHubContext<PresenceHub> presenceHub,PresenceTracker tracker)
        {
            _tracker = tracker;
            _presenceHub = presenceHub;
        }

     

        public async Task SendMessageNew(Notification  notification)
        {
            var toUser = notification.AppUserId;

                var connections = await _tracker.GetConnectionsForUser(notification.Username);
                if (connections != null)
                {
                    await _presenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived",
                        new { username = toUser, name = notification.Name, content = notification.Content, url =notification.Url});

            }
            

        }

   
    }
}