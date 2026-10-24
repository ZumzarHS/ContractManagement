using Application.Suppliers.CreateSupplier;
using Application.Suppliers.GetSupplierById;
using Application.Suppliers.GetSuppliers;
using ContractManagement.Api.Common;

namespace ContractManagement.Api.Endpoints
{
    public static class SupplierEndpoints
    {
        public static void MapSupplierEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/api/suppliers")
                .WithTags("Suppliers");

            group.MapPost("", CreateSupplier);
            group.MapGet("/{supplierId:guid}", GetSupplierById);
            group.MapGet("/", GetSuppliers);
        }

        private static async Task<IResult> CreateSupplier(
            CreateSupplierCommand command,
            CreateSupplierCommandHandler handler,
            CancellationToken ct)
        {
            var result = await handler.Handle(command, ct);

            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }
            return Results.Json(
                result.Value,
                statusCode: StatusCodes.Status201Created);
        }

        private static async Task<IResult> GetSupplierById(
            Guid supplierId,
            GetSupplierByIdQueryHandler handler,
            CancellationToken ct)
        {
            var result = await handler.Handle(new GetSupplierByIdQuery(supplierId), ct);
            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }
            return Results.Ok(result.Value);
        }
        private static async Task<IResult> GetSuppliers(
          GetSuppliersQueryHandler handler,
          CancellationToken ct)
        {
            var result = await handler.Handle(new GetSuppliersQuery(), ct);
            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }
            return Results.Ok(result.Value);
        }
    }
}
