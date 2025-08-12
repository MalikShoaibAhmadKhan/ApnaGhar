using Microsoft.EntityFrameworkCore;
using RealEstate.API.Data;
using RealEstate.API.Entities;
using RealEstate.API.Interfaces;

namespace RealEstate.API.Repositories
{
    public class ViewedPropertyRepository : IViewedPropertyRepository
    {
        private readonly DataContext _context;

        public ViewedPropertyRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Property>> GetRecentlyViewedPropertiesAsync(int userId, int count = 10)
        {
            return await _context.ViewedProperties
                .Where(vp => vp.UserId == userId)
                .OrderByDescending(vp => vp.ViewedAt)
                .Take(count)
                .Select(vp => vp.Property)
                .Distinct()
                .ToListAsync();
        }

        public async Task AddViewedPropertyAsync(int userId, int propertyId)
        {
            // Check if this property was already viewed by this user recently
            var existingView = await _context.ViewedProperties
                .FirstOrDefaultAsync(vp => vp.UserId == userId && vp.PropertyId == propertyId);

            if (existingView != null)
            {
                // Update the viewed time
                existingView.ViewedAt = DateTime.UtcNow;
            }
            else
            {
                // Add new viewed property record
                var viewedProperty = new ViewedProperty
                {
                    UserId = userId,
                    PropertyId = propertyId,
                    ViewedAt = DateTime.UtcNow
                };
                _context.ViewedProperties.Add(viewedProperty);
            }
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}