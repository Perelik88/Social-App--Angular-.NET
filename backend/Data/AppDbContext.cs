using Microsoft.EntityFrameworkCore;
using backend.Entities;

namespace backend.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
}
