using Microsoft.EntityFrameworkCore;
using RealEstate.API.Data;
using RealEstate.API.Entities;
using RealEstate.API.Interfaces;

namespace RealEstate.API.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext _context;

        public PropertyRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Property> GetPropertyByIdAsync(int id)
        {
            return await _context.Properties.FindAsync(id);
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync()
        {
            return await _context.Properties.ToListAsync();
        }

        public async Task<IEnumerable<Property>> GetFilteredPropertiesAsync(string suburb, decimal? minPrice, decimal? maxPrice, int? bedrooms, string listingType)
        {
            var query = _context.Properties.AsQueryable();

            if (!string.IsNullOrEmpty(suburb))
            {
                query = query.Where(p => p.Suburb.Contains(suburb) || p.City.Contains(suburb) || p.Address.Contains(suburb));
            }

            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            if (bedrooms.HasValue)
            {
                query = query.Where(p => p.Bedrooms == bedrooms.Value);
            }

            if (!string.IsNullOrEmpty(listingType))
            {
                query = query.Where(p => p.ListingType == listingType);
            }

            return await query.ToListAsync();
        }

        public async Task<Property> AddPropertyAsync(Property property)
        {
            _context.Properties.Add(property);
            await _context.SaveChangesAsync();
            return property;
        }

        public async Task<bool> UpdatePropertyAsync(Property property)
        {
            _context.Entry(property).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeletePropertyAsync(int id)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property == null)
                return false;

            _context.Properties.Remove(property);
            return await _context.SaveChangesAsync() > 0;
        }

        public void AddProperty(Property property)
        {
            _context.Properties.Add(property);
        }

        public void DeleteProperty(Property property)
        {
            _context.Properties.Remove(property);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
