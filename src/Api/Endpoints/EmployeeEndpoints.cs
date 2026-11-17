using Application.Employees.GetEmployees;
using ContractManagement.Api.Common;

namespace ContractManagement.Api.Endpoints
{
    public static class EmployeeEndpoints
    {
        public static void MapEmployeesEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/api/employees")
                .WithTags("Employees");

            group.MapGet("/", GetEmployees);
        }

        private static async Task<IResult> GetEmployees(
        GetEmployeesQueryHandler handler,
        CancellationToken ct)
        {
            var result = await handler.Handle(new GetEmployeesQuery(), ct);
            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }
            return Results.Ok(result.Value);
        }
    }
}
