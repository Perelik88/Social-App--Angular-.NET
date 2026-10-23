using backend.DTOs;
using backend.Entities;

namespace backend.Interfaces;

public interface IMemberRepository
{
    Task<bool> SaveAllAsync();
    Task<Member?> GetMemberByIdAsync(string id);
    Task<IReadOnlyList<Member>> GetAllMembersAsync();
    Task<IReadOnlyList<Photo>> GetAllPhotosForMemberAsync(string memberId);
    Task<bool> UpdateMemberAsync(string id, MemberUpdateDto memberUpdateDto);
    Task<Member?> GetMemberForUpdateAsync(string id);
}
