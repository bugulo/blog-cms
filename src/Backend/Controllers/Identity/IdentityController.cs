using System.Security.Claims;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

using Backend.Database;
using Backend.Database.Entities;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IdentityController : ControllerBase
{
    private readonly DatabaseContext _databaseContext;

    public IdentityController(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;

    }

    [HttpPost("register")]
    public ActionResult Register([FromBody] IdentityRegisterModel model)
    {
        if (_databaseContext.Users.Any(x => x.Username == model.Username))
            return BadRequest();

        var hasher = new PasswordHasher<string>();

        _databaseContext.Users.Add(new UserEntity
        {
            Username = model.Username,
            Password = hasher.HashPassword(model.Username, model.Password)
        });

        _databaseContext.SaveChanges();
        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] IdentityLoginModel model)
    {
        var user = _databaseContext.Users.FirstOrDefault(x => x.Username == model.Username);

        if (user == null)
            return BadRequest();

        var hasher = new PasswordHasher<string>();
        var result = hasher.VerifyHashedPassword(user.Username, user.Password, model.Password);

        if (result == PasswordVerificationResult.Failed)
            return BadRequest();

        if (result == PasswordVerificationResult.SuccessRehashNeeded)
        {
            user.Password = hasher.HashPassword(user.Username, user.Password);
            _databaseContext.SaveChanges();
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var authProperties = new AuthenticationProperties();

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
        return Ok();
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok();
    }

    [Authorize]
    [HttpGet]
    public IActionResult GetUserData()
    {
        return Ok(new
        {
            Id = User.FindFirstValue(ClaimTypes.NameIdentifier),
            Username = User.FindFirstValue(ClaimTypes.Name)
        });
    }
}
