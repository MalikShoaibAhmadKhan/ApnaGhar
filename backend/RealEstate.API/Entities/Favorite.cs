using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstate.API.Entities
{
    public class Favorite
    {
        [Key]
        [Column(Order = 0)]
        [ForeignKey("User")]
        public int UserId { get; set; }
        
        [Key]
        [Column(Order = 1)]
        [ForeignKey("Property")]
        public int PropertyId { get; set; }
        
        public User User { get; set; }
        public Property Property { get; set; }
    }
}
