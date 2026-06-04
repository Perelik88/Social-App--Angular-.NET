using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController( AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<User>>> GetUsers()
    {
        var users = await db.Users.ToListAsync();
        return users;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserById(string id)
    {
        var user = await db.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        return user;
    }
}
