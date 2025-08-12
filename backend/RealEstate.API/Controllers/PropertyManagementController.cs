using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.API.Data;
using RealEstate.API.Entities;
using System.Security.Claims;

namespace RealEstate.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PropertyManagementController : ControllerBase
    {
        private readonly DataContext _context;

        public PropertyManagementController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Property>> CreateProperty([FromBody] CreatePropertyDto propertyDto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User not authenticated");
                }

                var property = new Property
                {
                    Title = propertyDto.Title,
                    Description = propertyDto.Description,
                    Address = propertyDto.Address,
                    Suburb = propertyDto.Suburb ?? string.Empty,
                    City = propertyDto.City,
                    Price = propertyDto.Price,
                    ListingType = propertyDto.ListingType,
                    Bedrooms = propertyDto.Bedrooms,
                    Bathrooms = propertyDto.Bathrooms,
                    CarSpots = propertyDto.CarSpots,
                    ImageUrls = System.Text.Json.JsonSerializer.Serialize(propertyDto.ImageUrls ?? new List<string>()),
                    UserId = int.Parse(userId)
                };

                _context.Properties.Add(property);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetProperty), new { id = property.Id }, property);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating property: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Property>> GetProperty(int id)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property == null)
            {
                return NotFound();
            }
            return property;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProperty(int id, [FromBody] UpdatePropertyDto propertyDto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var property = await _context.Properties.FindAsync(id);

                if (property == null)
                {
                    return NotFound();
                }

                // Check if user owns this property
                if (property.UserId != int.Parse(userId))
                {
                    return Forbid("You can only update your own properties");
                }

                property.Title = propertyDto.Title;
                property.Description = propertyDto.Description;
                property.Address = propertyDto.Address;
                property.Suburb = propertyDto.Suburb ?? string.Empty;
                property.City = propertyDto.City;
                property.Price = propertyDto.Price;
                property.ListingType = propertyDto.ListingType;
                property.Bedrooms = propertyDto.Bedrooms;
                property.Bathrooms = propertyDto.Bathrooms;
                property.CarSpots = propertyDto.CarSpots;
                if (propertyDto.ImageUrls != null)
                    property.ImageUrls = System.Text.Json.JsonSerializer.Serialize(propertyDto.ImageUrls);

                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating property: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var property = await _context.Properties.FindAsync(id);

                if (property == null)
                {
                    return NotFound();
                }

                // Check if user owns this property
                if (property.UserId != int.Parse(userId))
                {
                    return Forbid("You can only delete your own properties");
                }

                _context.Properties.Remove(property);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting property: {ex.Message}");
            }
        }

        [HttpGet("my-properties")]
        public async Task<ActionResult<IEnumerable<Property>>> GetMyProperties()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User not authenticated");
                }

                var properties = await _context.Properties
                    .Where(p => p.UserId == int.Parse(userId))
                    .OrderByDescending(p => p.Id)
                    .ToListAsync();

                return Ok(properties);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error fetching properties: {ex.Message}");
            }
        }
    }

    public class CreatePropertyDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string? Suburb { get; set; }
        public string City { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ListingType { get; set; } = "Sale";
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public int CarSpots { get; set; }
        public List<string>? ImageUrls { get; set; }
    }

    public class UpdatePropertyDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string? Suburb { get; set; }
        public string City { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ListingType { get; set; } = "Sale";
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public int CarSpots { get; set; }
        public List<string>? ImageUrls { get; set; }
    }
}