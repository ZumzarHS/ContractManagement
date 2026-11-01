using Application.Interfaces;
using ContractManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContractManagement.Infrastructure.Persistence.Repositories;

public sealed class CatalogItemRepository : ICatalogItemRepository
{
    private readonly AppDbContext _dbContext;

    public CatalogItemRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(CatalogItem catalogItem, CancellationToken ct)
    {
        await _dbContext.CatalogItems.AddAsync(catalogItem, ct);
        await _dbContext.SaveChangesAsync(ct);
    }

    public async Task<CatalogItem?> GetByIdAsync(Guid id, CancellationToken ct)
    {
        return await _dbContext.CatalogItems
            .FirstOrDefaultAsync(ci => ci.CatalogItemId == id, ct);
    }

    public async Task<IEnumerable<CatalogItem>> GetAllAsync(CancellationToken ct)
    {
        return await _dbContext.CatalogItems
            .ToListAsync(ct);
    }
}
