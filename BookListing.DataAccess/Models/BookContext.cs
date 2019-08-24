using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookListing.DataAccess.Models
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options)
            : base(options)
        { }

        public BookContext() : base() { }

        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().Property(e => e.AverageRating).HasColumnType("decimal(5,2)");

            modelBuilder.Entity<User>().HasAlternateKey(e => e.Username).HasName("UniqueKey_UserName");
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasAlternateKey(e => e.Username).HasName("UniqueKey_UserName");
                entity.Property(e => e.Password).IsRequired();
                entity.Property(e => e.Role).IsRequired();
            });
        }
    }
}
