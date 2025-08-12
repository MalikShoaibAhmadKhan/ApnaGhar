using Microsoft.EntityFrameworkCore;
using RealEstate.API.Entities;

namespace RealEstate.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<ViewedProperty> ViewedProperties { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Favorite>()
                .HasKey(f => new { f.UserId, f.PropertyId });

            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.User)
                .WithMany(u => u.Favorites)
                .HasForeignKey(f => f.UserId);

            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.Property)
                .WithMany(p => p.Favorites)
                .HasForeignKey(f => f.PropertyId);

            // Configure ViewedProperty relationships
            modelBuilder.Entity<ViewedProperty>()
                .HasOne(vp => vp.User)
                .WithMany()
                .HasForeignKey(vp => vp.UserId);

            modelBuilder.Entity<ViewedProperty>()
                .HasOne(vp => vp.Property)
                .WithMany()
                .HasForeignKey(vp => vp.PropertyId);
        }
    }
}
