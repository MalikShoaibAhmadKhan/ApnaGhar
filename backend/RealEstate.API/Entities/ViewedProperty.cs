using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstate.API.Entities
{
    public class ViewedProperty
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public int PropertyId { get; set; }
        
        [Required]
        public DateTime ViewedAt { get; set; }
        
        [ForeignKey("UserId")]
        public User User { get; set; }
        
        [ForeignKey("PropertyId")]
        public Property Property { get; set; }
    }
}