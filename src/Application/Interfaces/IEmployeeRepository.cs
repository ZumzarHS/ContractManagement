using ContractManagement.Domain.Entities;

namespace Application.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync(CancellationToken ct);
        Task<Employee?> GetByIdAsync(Guid id, CancellationToken ct);
    }
}
