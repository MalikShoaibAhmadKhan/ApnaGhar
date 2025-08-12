using RealEstate.API.Entities;

namespace RealEstate.API.Interfaces
{
    public interface IViewedPropertyRepository
    {
        Task<IEnumerable<Property>> GetRecentlyViewedPropertiesAsync(int userId, int count = 10);
        Task AddViewedPropertyAsync(int userId, int propertyId);
        Task<bool> SaveAllAsync();
    }
}