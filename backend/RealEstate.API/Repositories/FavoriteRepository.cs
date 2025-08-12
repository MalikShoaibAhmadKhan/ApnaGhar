using Microsoft.EntityFrameworkCore;
using RealEstate.API.Data;
using RealEstate.API.Entities;
using RealEstate.API.Interfaces;

namespace RealEstate.API.Repositories
{
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly DataContext _context;

        public FavoriteRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Favorite> GetFavorite(int userId, int propertyId)
        {
            return await _context.Favorites
                .FindAsync(userId, propertyId);
        }

        public async Task<IEnumerable<Property>> GetUserFavorites(int userId)
        {
            return await _context.Favorites
                .Where(f => f.UserId == userId)
                .Select(f => f.Property)
                .ToListAsync();
        }

        public void AddFavorite(Favorite favorite)
        {
            _context.Favorites.Add(favorite);
        }

        public void RemoveFavorite(Favorite favorite)
        {
            _context.Favorites.Remove(favorite);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
