using ContractManagement.Domain.Entities;

namespace Application.Interfaces
{
    public interface IContractRepository
    {
        Task AddAsync(Contract contract, CancellationToken ct);
        Task<Contract?> GetByIdAsync(Guid id, CancellationToken ct);
    }
}
