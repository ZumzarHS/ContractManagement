using Application.Contracts.CreateContract;
using Application.Contracts.GetContracts;
using Application.Contracts.GetContractById;
using ContractManagement.Api.Common;
using Application.Contracts.UpdateContract;
using Api.Contracts;

namespace ContractManagement.Api.Endpoints
{
    public static class ContractEndpoints
    {
        public static void MapContractEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/api/contracts")
                .WithTags("Contracts");

            group.MapPost("", CreateContract);
            group.MapGet("/", GetContracts);
            group.MapGet("/{contractId:guid}", GetContractById);
            group.MapPut("/{contractId:guid}", UpdateContract);
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
        private static async Task<IResult> UpdateContract(Guid contractId, UpdateContractRequest request, UpdateContractCommandHandler handler, CancellationToken ct)
        {
            var contractLines = request.ContractLines.Select(line =>
                new UpdateContractLineCommand(
                    line.ContractLineId,
                    line.CatalogItemId,
                    line.Producer,
                    line.Model,
                    line.Price,
                    line.Quantity,
                    line.Description,
                    line.InitialAmount,
                    line.DeliveryFrequencyInterval,
                    line.DeliveryFrequencyUnit,
                    line.PaymentFrequencyInterval,
                    line.PaymentFrequencyUnit
                )).ToList();

            var command = new UpdateContractCommand(
            contractId,
            request.SupplierId,
            request.Title,
            request.Description,
            request.StartDate,
            request.EndDate,
            request.ActionDate,
            request.NoticePeriodValue,
            request.NoticePeriodUnit,
            contractLines,
            request.EmployeeId
        );
            var result = await handler.Handle(command, ct);

            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }
            return Results.NoContent();
        }
    
    }
}
