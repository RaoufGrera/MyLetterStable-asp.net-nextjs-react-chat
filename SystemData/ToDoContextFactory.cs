using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace SystemData
{
    public class ToDoContextFactory : IDesignTimeDbContextFactory<SystemContext>
    {
        public SystemContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<SystemContext>();
            //builder.UseNpgsql("Host=localhost;Port=5432;Username=postgres;Password=102030;Database=TodoList");
             builder.UseNpgsql("Host=postgresql_database;Port=5432;Username=postgres;Password=102030;Database=myletter");

            return new SystemContext(builder.Options);
        }
    }
}
