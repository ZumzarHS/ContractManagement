using ContractManagement.Domain.Entities;

namespace Application.Interfaces
{
    public interface ISupplierRepository
    {
        Task AddAsync(Supplier supplier, CancellationToken ct);
        Task<Supplier?> GetByIdAsync(Guid id, CancellationToken ct);
        Task<IEnumerable<Supplier>> GetAllAsync(CancellationToken ct);
    }
}
