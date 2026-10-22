using Application.Contracts.CreateContract.Commands;

namespace ContractManagement.Api.Endpoints
{
    public static class ContractEndpoints
    {
        public static void MapContractEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/api/contracts")
                .WithTags("Contracts");

            group.MapPost("", CreateContract);
        }

        private static async Task<IResult> CreateContract(
            CreateContractCommand command,
            CreateContractCommandHandler handler,
            CancellationToken ct)
        {
            var contractId = await handler.Handle(command, ct);

            return Results.Json(
                contractId, 
                statusCode: StatusCodes.Status201Created);
        }
    }
}
