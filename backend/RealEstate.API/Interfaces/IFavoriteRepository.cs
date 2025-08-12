using System.Collections.Generic;
using System.Threading.Tasks;
using RealEstate.API.Entities;

namespace RealEstate.API.Interfaces
{
    public interface IFavoriteRepository
    {
        Task<Favorite> GetFavorite(int userId, int propertyId);
        Task<IEnumerable<Property>> GetUserFavorites(int userId);
        void AddFavorite(Favorite favorite);
        void RemoveFavorite(Favorite favorite);
        Task<bool> SaveAllAsync();
    }
}
