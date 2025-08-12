using System.ComponentModel.DataAnnotations;

namespace RealEstate.API.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        
        [Required]
        public byte[] PasswordHash { get; set; }
        
        [Required]
        public byte[] PasswordSalt { get; set; }
        
        public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    }
}
