using ContractManagement.Domain.Entities;

namespace Application.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync(CancellationToken ct);
    }
}
