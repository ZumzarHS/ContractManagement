using Application.Common.Results;

namespace Application.Contracts.Common;

public static class ContractHistoryErrors
{
    public static Error EmployeeNotFound(Guid employeeId) =>
        new(
            "Employees.NotFound",
            $"Employee with ID '{employeeId}' was not found.",
            ErrorType.NotFound);
}
