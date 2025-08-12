using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealEstate.API.Entities;
using System.Security.Cryptography;
using System.Text;

namespace RealEstate.API.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            // Ensure database and tables are created
            await context.Database.EnsureCreatedAsync();
            
            if (await context.Users.AnyAsync()) return;

            // Create password hash and salt for seed users
            var users = new List<User>();
            
            CreatePasswordHash("admin123", out byte[] adminPasswordHash, out byte[] adminPasswordSalt);
            users.Add(new User
            {
                Email = "admin@realestate.com",
                PasswordHash = adminPasswordHash,
                PasswordSalt = adminPasswordSalt
            });

            CreatePasswordHash("user123", out byte[] userPasswordHash, out byte[] userPasswordSalt);
            users.Add(new User
            {
                Email = "user@realestate.com",
                PasswordHash = userPasswordHash,
                PasswordSalt = userPasswordSalt
            });

            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();

            var properties = new[]
            {
                new Property
                {
                    Title = "Modern Downtown Apartment",
                    Description = "Beautiful 2-bedroom apartment in the heart of downtown with stunning city views.",
                    Price = 450000,
                    Address = "123 Main St",
                    City = "New York",
                    Suburb = "Downtown",
                    ListingType = "Sale",
                    Bedrooms = 2,
                    Bathrooms = 2,
                    CarSpots = 1,
                    ImageUrls = "[\"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80\",\"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80\"]",
                    UserId = 1
                },
                new Property
                {
                    Title = "Suburban Family Home",
                    Description = "Spacious 4-bedroom family home with large backyard and modern amenities.",
                    Price = 750000,
                    Address = "456 Oak Ave",
                    City = "Los Angeles",
                    Suburb = "Beverly Hills",
                    ListingType = "Sale",
                    Bedrooms = 4,
                    Bathrooms = 3,
                    CarSpots = 2,
                    ImageUrls = "[\"https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80\",\"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80\"]",
                    UserId = 1
                },
                new Property
                {
                    Title = "Luxury Penthouse",
                    Description = "Exclusive penthouse with panoramic views and premium finishes throughout.",
                    Price = 2500000,
                    Address = "789 Sky Tower",
                    City = "Miami",
                    Suburb = "Brickell",
                    ListingType = "Sale",
                    Bedrooms = 3,
                    Bathrooms = 3,
                    CarSpots = 2,
                    ImageUrls = "[\"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80\",\"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80\"]",
                    UserId = 2
                },
                new Property
                {
                    Title = "Cozy Studio Apartment",
                    Description = "Perfect starter home or investment property in trendy neighborhood.",
                    Price = 275000,
                    Address = "321 Artist Way",
                    City = "San Francisco",
                    Suburb = "Arts District",
                    ListingType = "Sale",
                    Bedrooms = 1,
                    Bathrooms = 1,
                    CarSpots = 0,
                    ImageUrls = "[\"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80\"]",
                    UserId = 2
                },
                new Property
                {
                    Title = "Rental Apartment Downtown",
                    Description = "Modern rental apartment with great amenities and city access.",
                    Price = 2500,
                    Address = "555 Central Ave",
                    City = "Chicago",
                    Suburb = "Downtown",
                    ListingType = "Rent",
                    Bedrooms = 2,
                    Bathrooms = 1,
                    CarSpots = 1,
                    ImageUrls = "[\"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80\"]",
                    UserId = 1
                },
                new Property
                {
                    Title = "Beachfront Villa",
                    Description = "Stunning beachfront villa with private beach access and ocean views.",
                    Price = 1800000,
                    Address = "888 Ocean Drive",
                    City = "Miami",
                    Suburb = "South Beach",
                    ListingType = "Sale",
                    Bedrooms = 5,
                    Bathrooms = 4,
                    CarSpots = 3,
                    ImageUrls = "[\"https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80\",\"https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80\"]",
                    UserId = 1
                }
            };

            await context.Properties.AddRangeAsync(properties);
            await context.SaveChangesAsync();
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
