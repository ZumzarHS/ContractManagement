using Application.Contracts.CreateContract;
using Application.Contracts.GetContracts;
using Application.Contracts.GetContractById;

namespace ContractManagement.Api.Endpoints
{
    public static class ContractEndpoints
    {
        public static void MapContractEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/api/contracts")
                .WithTags("Contracts");

            group.MapPost("", CreateContract);
            group.MapGet("/{contractId}", GetContractById);
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
                return Results.BadRequest(result.Error);
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
                return Results.NotFound(result.Error);
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
                return Results.Problem(
                    title: "Could not retrieve contracts",
                    statusCode: StatusCodes.Status500InternalServerError);
            }
            return Results.Ok(result.Value);
        }
    }
}
