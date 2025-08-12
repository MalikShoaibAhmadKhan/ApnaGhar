using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstate.API.DTOs;
using RealEstate.API.Entities;
using RealEstate.API.Interfaces;

namespace RealEstate.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoriteRepository _favoriteRepo;
        private readonly IPropertyRepository _propertyRepo;
        private readonly IMapper _mapper;

        public FavoritesController(IFavoriteRepository favoriteRepo, IPropertyRepository propertyRepo, IMapper mapper)
        {
            _favoriteRepo = favoriteRepo;
            _propertyRepo = propertyRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserFavorites()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var favorites = await _favoriteRepo.GetUserFavorites(userId);
            var favoritesToReturn = _mapper.Map<IEnumerable<PropertyDto>>(favorites);
            return Ok(favoritesToReturn);
        }

        [HttpPost("{propertyId}")]
        public async Task<IActionResult> AddFavorite(int propertyId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var existingFavorite = await _favoriteRepo.GetFavorite(userId, propertyId);
            if (existingFavorite != null)
                return BadRequest("Property already in favorites");

            var property = await _propertyRepo.GetPropertyByIdAsync(propertyId);
            if (property == null)
                return NotFound("Property not found");

            var favorite = new Favorite
            {
                UserId = userId,
                PropertyId = propertyId
            };

            _favoriteRepo.AddFavorite(favorite);

            if (await _favoriteRepo.SaveAllAsync())
                return Ok();

            return BadRequest("Failed to add favorite");
        }

        [HttpDelete("{propertyId}")]
        public async Task<IActionResult> RemoveFavorite(int propertyId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var favorite = await _favoriteRepo.GetFavorite(userId, propertyId);
            if (favorite == null)
                return NotFound("Favorite not found");

            _favoriteRepo.RemoveFavorite(favorite);

            if (await _favoriteRepo.SaveAllAsync())
                return Ok();

            return BadRequest("Failed to remove favorite");
        }
    }
}
