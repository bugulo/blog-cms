using System.Security.Claims;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Backend.Database;
using Backend.Database.Entities;

using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly DatabaseContext _databaseContext;

    public PostsController(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_databaseContext.Posts.OrderByDescending(x => x.CreatedAt).Include(x => x.Author));
    }

    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
        var post = _databaseContext.Posts.Include(x => x.Author).FirstOrDefault(x => x.Id == id);

        if (post == null)
            return BadRequest();

        return Ok(post);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create([FromBody] PostCreateModel model)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        _databaseContext.Add(new PostEntity
        {
            Title = model.Title,
            Content = model.Content,
            AuthorId = userId,
            CreatedAt = DateTime.UtcNow
        });

        _databaseContext.SaveChanges();
        return Ok();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        var post = _databaseContext.Posts.FirstOrDefault(x => x.Id == id && x.AuthorId == userId);

        if (post == null)
            return BadRequest();

        _databaseContext.Posts.Remove(post);
        _databaseContext.SaveChanges();
        return Ok();
    }

    [Authorize]
    [HttpPatch("{id}")]
    public IActionResult Update(Guid id, [FromBody] PostCreateModel model)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        var post = _databaseContext.Posts.FirstOrDefault(x => x.Id == id && x.AuthorId == userId);

        if (post == null)
            return BadRequest();

        post.Title = model.Title;
        post.Content = model.Content;

        _databaseContext.Posts.Update(post);
        _databaseContext.SaveChanges();
        return Ok();
    }
}