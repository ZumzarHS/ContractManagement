using Application.Interfaces;
using ContractManagement.Domain.Entities;

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
}