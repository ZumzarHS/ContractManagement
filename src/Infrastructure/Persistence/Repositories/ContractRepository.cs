using Application.Interfaces;
using ContractManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContractManagement.Infrastructure.Persistence.Repositories;
public sealed class ContractRepository : IContractRepository
{
    private readonly AppDbContext _dbContext;
    public ContractRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Contract contract, CancellationToken ct)
    {
       await _dbContext.Contracts.AddAsync(contract, ct);
       await _dbContext.SaveChangesAsync(ct);
    }
        
    public async Task<Contract?> GetByIdAsync(
        Guid id, 
        CancellationToken ct = default)
    {
        return await _dbContext.Contracts
           .Include(c=>c.ContractLines)
           .FirstOrDefaultAsync(c => c.ContractId == id, ct);
    }
}