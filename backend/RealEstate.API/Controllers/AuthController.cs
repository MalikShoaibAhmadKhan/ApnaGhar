using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RealEstate.API.DTOs;
using RealEstate.API.Entities;
using RealEstate.API.Interfaces;

namespace RealEstate.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly ITokenService _tokenService;
        public AuthController(IAuthRepository authRepo, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _authRepo = authRepo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            registerDto.Email = registerDto.Email.ToLower();

            if (await _authRepo.UserExists(registerDto.Email))
                return BadRequest("Email is already taken");

            var userToCreate = new User
            {
                Email = registerDto.Email
            };

            var createdUser = await _authRepo.Register(userToCreate, registerDto.Password);

            return Ok(new UserDto
            {
                Email = createdUser.Email,
                Token = _tokenService.CreateToken(createdUser)
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var userFromRepo = await _authRepo.Login(loginDto.Email.ToLower(), loginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var user = new UserDto
            {
                Email = userFromRepo.Email,
                Token = _tokenService.CreateToken(userFromRepo)
            };

            return Ok(user);
        }
    }
}
