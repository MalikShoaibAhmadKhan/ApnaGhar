using System.ComponentModel.DataAnnotations;

namespace RealEstate.API.Entities
{
    public class Property
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [StringLength(500)]
        public string Address { get; set; } = string.Empty;
        
        [StringLength(100)]
        public string City { get; set; } = string.Empty;
        
        [StringLength(100)]
        public string Suburb { get; set; } = string.Empty;
        
        [Required]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }
        
        [Required]
        [StringLength(50)]
        public string ListingType { get; set; } = "Sale"; // Rent or Sale
        
        [Required]
        [Range(0, int.MaxValue)]
        public int Bedrooms { get; set; }
        
        [Required]
        [Range(0, int.MaxValue)]
        public int Bathrooms { get; set; }
        
        [Required]
        [Range(0, int.MaxValue)]
        public int CarSpots { get; set; }
        
        [Required]
        [StringLength(2000)]
        public string Description { get; set; } = string.Empty;
        
        public string ImageUrls { get; set; } = "[]"; // Store as JSON string
        
        public int UserId { get; set; } // Keep as int to match existing schema
        public User User { get; set; } = null!;
        
        public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    }
}
