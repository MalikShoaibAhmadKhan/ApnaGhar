using RealEstate.API.Entities;

namespace RealEstate.API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
