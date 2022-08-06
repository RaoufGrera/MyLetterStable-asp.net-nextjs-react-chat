using System;
using System.Linq;
using SystemData.Models;

namespace MyLetterStable.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<Message> MarkUnreadAsRead(this IQueryable<Message> query, long currentId)
        {

            var unreadMessages = query.Where(m => m.DateRead == null
                && m.RecipientId == currentId);

            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow.AddHours(2); 
                }
            }

            return query;
        }
    }
}