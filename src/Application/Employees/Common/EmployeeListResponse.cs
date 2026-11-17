namespace Application.Employees.Common
{
    public sealed record EmployeeListResponse(
        Guid EmployeeId,
        string Name,
        string Email
        );
}
