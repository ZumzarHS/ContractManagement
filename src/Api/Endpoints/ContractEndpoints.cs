using Application.Contracts.CreateContract;
using Application.Contracts.GetContracts;
using Application.Contracts.GetContractById;
using ContractManagement.Api.Common;

namespace ContractManagement.Api.Endpoints
{
    public static class ContractEndpoints
    {
        public static void MapContractEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/api/contracts")
                .WithTags("Contracts");

            group.MapPost("", CreateContract);
            group.MapGet("/{contractId:guid}", GetContractById);
            group.MapGet("/", GetContracts);
        }

        private static async Task<IResult> CreateContract(
            CreateContractCommand command,
            CreateContractCommandHandler handler,
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

        private static async Task<IResult> GetContractById(
            Guid contractId,
            GetContractByIdQueryHandler handler,
            CancellationToken ct)
        {
            var result = await handler.Handle(new GetContractByIdQuery(contractId), ct);
            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }
            return Results.Ok(result.Value);
        }
        private static async Task<IResult> GetContracts(
          GetContractsQueryHandler handler,
          CancellationToken ct)
        {
            var result = await handler.Handle(new GetContractsQuery(), ct);
            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }
            return Results.Ok(result.Value);
        }
    }
}
