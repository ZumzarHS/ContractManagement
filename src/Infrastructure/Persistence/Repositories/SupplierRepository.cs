using Application.Interfaces;
using ContractManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContractManagement.Infrastructure.Persistence.Repositories;
public sealed class SupplierRepository : ISupplierRepository
{
    private readonly AppDbContext _dbContext;
    public SupplierRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Supplier supplier, CancellationToken ct)
    {
       await _dbContext.Suppliers.AddAsync(supplier, ct);
       await _dbContext.SaveChangesAsync(ct);
    }
        
    public async Task<Supplier?> GetByIdAsync(
        Guid id, 
        CancellationToken ct = default)
    {
        return await _dbContext.Suppliers
           .FirstOrDefaultAsync(s => s.SupplierId == id, ct);
    }

    public async Task<IEnumerable<Supplier>> GetAllAsync(CancellationToken ct)
    {
        return await _dbContext.Suppliers
            .ToListAsync(ct);
    }
}