using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CustomerManagementSystem.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
