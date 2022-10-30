using Microsoft.EntityFrameworkCore;
using MyTodoApi.Models;

namespace MyTodoApi.Context
{
    public class ToDoContext : DbContext
    {
        // public DbSet<User> Users { get; set; }
        public DbSet<Todo> Todos { get; set; }
        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<User>()
            //     .HasMany(e => e.Todos)
            //     .WithOne(rs => rs.User)
            //     .OnDelete(DeleteBehavior.Cascade);
        }
    }
}