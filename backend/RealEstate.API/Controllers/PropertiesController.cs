using System.Collections.Generic;
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
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyRepository _propertyRepo;
        private readonly IMapper _mapper;

        public PropertiesController(IPropertyRepository propertyRepo, IMapper mapper)
        {
            _propertyRepo = propertyRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetProperties([FromQuery] string suburb = null, 
            [FromQuery] decimal? minPrice = null, 
            [FromQuery] decimal? maxPrice = null, 
            [FromQuery] int? bedrooms = null,
            [FromQuery] string listingType = null)
        {
            var properties = await _propertyRepo.GetFilteredPropertiesAsync(suburb, minPrice, maxPrice, bedrooms, listingType);
            var propertiesToReturn = _mapper.Map<IEnumerable<PropertyDto>>(properties);
            return Ok(propertiesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(int id)
        {
            var property = await _propertyRepo.GetPropertyByIdAsync(id);
            if (property == null)
                return NotFound();

            var propertyToReturn = _mapper.Map<PropertyDto>(property);
            return Ok(propertyToReturn);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateProperty(PropertyDto propertyDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var property = _mapper.Map<Property>(propertyDto);
            property.UserId = userId;

            _propertyRepo.AddProperty(property);

            if (await _propertyRepo.SaveAllAsync())
            {
                var propertyToReturn = _mapper.Map<PropertyDto>(property);
                return CreatedAtAction(nameof(GetProperty), new { id = property.Id }, propertyToReturn);
            }

            return BadRequest("Failed to create property");
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProperty(int id, PropertyDto propertyDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var property = await _propertyRepo.GetPropertyByIdAsync(id);

            if (property == null)
                return NotFound();

            if (property.UserId != userId)
                return Unauthorized("You can only update your own properties");

            _mapper.Map(propertyDto, property);

            if (await _propertyRepo.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to update property");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var property = await _propertyRepo.GetPropertyByIdAsync(id);

            if (property == null)
                return NotFound();

            if (property.UserId != userId)
                return Unauthorized("You can only delete your own properties");

            _propertyRepo.DeleteProperty(property);

            if (await _propertyRepo.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to delete property");
        }
    }
}
