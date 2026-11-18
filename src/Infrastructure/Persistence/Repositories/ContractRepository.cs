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
           .Include(c => c.ContractLines).ThenInclude(cl => cl.CatalogItem)
           .Include(c => c.Supplier)
           .Include(c => c.History).ThenInclude(h => h.Employee)
           .FirstOrDefaultAsync(c => c.ContractId == id, ct);
    }

    public async Task<IEnumerable<Contract>> GetAllAsync(CancellationToken ct)
    {
        return await _dbContext.Contracts
            .Include(c => c.Supplier)
            .ToListAsync(ct);
    }

    public async Task SaveChangesAsync(CancellationToken ct)
    {
        await _dbContext.SaveChangesAsync(ct);
    }

    public async Task AddHistoryAsync(
    ContractHistory history,
    CancellationToken ct)
    {
        await _dbContext.ContractHistories.AddAsync(history, ct);
    }
}