using Application.Common.Results;
using Application.Contracts.Common;
using Application.Employees.Common;
using Application.Interfaces;

namespace Application.Employees.GetEmployees
{
    public class GetEmployeesQueryHandler
    {
        private readonly IEmployeeRepository _employees;
        public GetEmployeesQueryHandler(IEmployeeRepository employees)
        {
            _employees = employees;
        }
        public async Task<Result<IReadOnlyList<EmployeeListResponse>>> Handle(
           GetEmployeesQuery query,
           CancellationToken ct)
        {
            var employees = await _employees.GetAllAsync(ct);

            var response = employees.Select(e => new EmployeeListResponse(
                e.EmployeeId,
                e.Name,
                e.Email
               ))
               .ToList();
            return Result<IReadOnlyList<EmployeeListResponse>>.Success(response);
        }
    }
}
