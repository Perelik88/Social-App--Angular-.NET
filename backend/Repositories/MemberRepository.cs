using backend.Data;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public async Task<Member?> GetMemberByIdAsync(string id)
    {
        return await context.Members.FindAsync(id);
    }

    public async Task<IReadOnlyList<Member>> GetAllMembersAsync()
    {
        return await context.Members.ToListAsync();
    }

    public async Task<IReadOnlyList<Photo>> GetAllPhotosForMemberAsync(string memberId)
    {
        return await context.Photos.Where(p => p.MemberId == memberId).ToListAsync();
    }

    public Task<bool> UpdateMemberAsync(string id, MemberUpdateDto memberUpdateDto)
    {
        throw new NotImplementedException();
    }

    public async Task<Member?> GetMemberForUpdateAsync(string id)
    {
        return await context.Members.Include(m => m.User).Include(m => m.Photos).FirstOrDefaultAsync(m => m.Id == id);
    }
}
