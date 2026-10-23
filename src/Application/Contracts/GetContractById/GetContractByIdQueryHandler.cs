using Application.Common.Results;
using Application.Contracts.Common;
using Application.Interfaces;

namespace Application.Contracts.GetContractById;

public class GetContractByIdQueryHandler
{
    private readonly IContractRepository _contracts;

    public GetContractByIdQueryHandler(IContractRepository contracts)
    {
        _contracts = contracts;
    }

    public async Task<Result<ContractResponse>> Handle(
        GetContractByIdQuery query,
        CancellationToken ct)
    {
        var contract = await _contracts.GetByIdAsync(query.ContractId, ct);

        if (contract is null)
        {
            return Result<ContractResponse>.Failure(
                ContractErrors.NotFound(query.ContractId));
        }

        var response = new ContractResponse(
            contract.ContractId,
            contract.Title,
            contract.Description,
            contract.StartDate,
            contract.EndDate,
            contract.ActionDate,
            contract.NoticePeriodValue,
            contract.NoticePeriodUnit,
            contract.ContractStatus,
            contract.ActionStatus,
            contract.SupplierId
        );

        return Result<ContractResponse>.Success(response);
    }
}