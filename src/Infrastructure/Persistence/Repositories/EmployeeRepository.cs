using Application.Interfaces;
using ContractManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContractManagement.Infrastructure.Persistence.Repositories
{
    public sealed class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _dbContext;
        public EmployeeRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync(CancellationToken ct)
        {
            return await _dbContext.Employees.
                AsNoTracking().
                ToListAsync(ct);
        }

        public async Task<Employee?> GetByIdAsync(Guid id, CancellationToken ct)
        {
            return await _dbContext.Employees
                .AsNoTracking()
                .FirstOrDefaultAsync(employee => employee.EmployeeId == id, ct);
        }
    }
}
