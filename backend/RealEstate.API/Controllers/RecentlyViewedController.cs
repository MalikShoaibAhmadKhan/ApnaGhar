using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstate.API.DTOs;
using RealEstate.API.Interfaces;

namespace RealEstate.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RecentlyViewedController : ControllerBase
    {
        private readonly IViewedPropertyRepository _viewedPropertyRepo;
        private readonly IMapper _mapper;

        public RecentlyViewedController(IViewedPropertyRepository viewedPropertyRepo, IMapper mapper)
        {
            _viewedPropertyRepo = viewedPropertyRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetRecentlyViewed([FromQuery] int count = 10)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var properties = await _viewedPropertyRepo.GetRecentlyViewedPropertiesAsync(userId, count);
            var propertiesToReturn = _mapper.Map<IEnumerable<PropertyDto>>(properties);
            return Ok(propertiesToReturn);
        }

        [HttpPost("{propertyId}")]
        public async Task<IActionResult> AddViewedProperty(int propertyId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            await _viewedPropertyRepo.AddViewedPropertyAsync(userId, propertyId);
            
            if (await _viewedPropertyRepo.SaveAllAsync())
                return Ok();

            return BadRequest("Failed to record property view");
        }
    }
}