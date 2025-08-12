using RealEstate.API.Entities;

namespace RealEstate.API.Interfaces
{
    public interface IPropertyRepository
    {
        Task<Property> GetPropertyByIdAsync(int id);
        Task<IEnumerable<Property>> GetPropertiesAsync();
        Task<IEnumerable<Property>> GetFilteredPropertiesAsync(string suburb, decimal? minPrice, decimal? maxPrice, int? bedrooms, string listingType);
        Task<Property> AddPropertyAsync(Property property);
        Task<bool> UpdatePropertyAsync(Property property);
        Task<bool> DeletePropertyAsync(int id);
        void AddProperty(Property property);
        void DeleteProperty(Property property);
        Task<bool> SaveAllAsync();
    }
}
