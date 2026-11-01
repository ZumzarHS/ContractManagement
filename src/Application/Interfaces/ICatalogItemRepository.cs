using ContractManagement.Domain.Entities;

namespace Application.Interfaces
{
    public interface ICatalogItemRepository
    {
        Task AddAsync(CatalogItem catalogItem, CancellationToken ct);
        Task<CatalogItem?> GetByIdAsync(Guid id, CancellationToken ct);
        Task<IEnumerable<CatalogItem>> GetAllAsync(CancellationToken ct);
    }
}
