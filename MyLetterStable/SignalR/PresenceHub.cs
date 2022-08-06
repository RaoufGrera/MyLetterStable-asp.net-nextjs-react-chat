using System;
using System.Linq;
using System.Threading.Tasks;
using MyLetterStable.Extensions;
using MyLetterStable.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SystemData;
using SystemData.Models;

namespace MyLetterStable.Services
{
    [Authorize]
    public class PresenceHub : Hub
    {
        private SystemContext _context;

        private readonly PresenceTracker _tracker;
        public PresenceHub(PresenceTracker tracker ,SystemContext context)
        {
            _context = context;
            _tracker = tracker;
        }

        public override async Task OnConnectedAsync()
        {
            var isOnline = await _tracker.UserConnected(Context.User.GetUsername(), Context.ConnectionId);
            if (isOnline) {
                AppUser appUser = _context.AppUser.FirstOrDefault(r => r.UserName == Context.User.GetUsername());
                if (appUser != null)
                {
                    appUser.LastActive = DateTime.UtcNow.AddHours(2);
                    appUser.Online = true;
                    await _context.SaveChangesAsync();
                }
                await Clients.Others.SendAsync("UserIsOnline", Context.User.GetUsername());
            }
            var currentUsers = await _tracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var isOffline = await _tracker.UserDisconnected(Context.User.GetUsername(), Context.ConnectionId);

            if (isOffline)
            {
                AppUser appUser =  _context.AppUser.FirstOrDefault(r => r.UserName == Context.User.GetUsername());
                if (appUser != null)
                {
                    appUser.LastActive = DateTime.UtcNow.AddHours(2);
                    appUser.Online = false;
                    await _context.SaveChangesAsync();
                }
                await Clients.Others.SendAsync("UserIsOffline", Context.User.GetUsername());
            }
            //Context.User.add
           
            await base.OnDisconnectedAsync(exception);
        }
    }
}