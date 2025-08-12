using AutoMapper;
using RealEstate.API.DTOs;
using RealEstate.API.Entities;
using System.Text.Json;

namespace RealEstate.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Property, PropertyDto>()
                .ForMember(dest => dest.ImageUrls, opt => opt.MapFrom<ImageUrlsFromJsonResolver>());
            
            CreateMap<PropertyDto, Property>()
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Favorites, opt => opt.Ignore())
                .ForMember(dest => dest.ImageUrls, opt => opt.MapFrom<ImageUrlsToJsonResolver>())
                .ForMember(dest => dest.UserId, opt => opt.Ignore());
            
            CreateMap<User, UserDto>();
            CreateMap<RegisterDto, User>();
        }
    }

    public class ImageUrlsFromJsonResolver : IValueResolver<Property, PropertyDto, List<string>>
    {
        public List<string> Resolve(Property source, PropertyDto destination, List<string> destMember, ResolutionContext context)
        {
            if (string.IsNullOrEmpty(source.ImageUrls))
                return new List<string>();
            
            try
            {
                return JsonSerializer.Deserialize<List<string>>(source.ImageUrls) ?? new List<string>();
            }
            catch
            {
                return new List<string>();
            }
        }
    }

    public class ImageUrlsToJsonResolver : IValueResolver<PropertyDto, Property, string>
    {
        public string Resolve(PropertyDto source, Property destination, string destMember, ResolutionContext context)
        {
            if (source.ImageUrls == null || source.ImageUrls.Count == 0)
                return "[]";
            
            return JsonSerializer.Serialize(source.ImageUrls);
        }
    }
}
