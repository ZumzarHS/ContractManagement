using Application.Common.Results;
using Application.Contracts.Common;
using Application.Interfaces;

namespace Application.Contracts.GetContracts
{
    public class GetContractsQueryHandler
    {
        private readonly IContractRepository _contracts;

        public GetContractsQueryHandler(IContractRepository contracts)
        {
            _contracts = contracts;
        }
        public async Task<Result<IReadOnlyList<ContractResponse>>> Handle(
            GetContractsQuery query,
            CancellationToken ct)
        {
            var contracts = await _contracts.GetAllAsync(ct);
           
            var response = contracts
                .Select(contract => new ContractResponse(
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
                ))
                .ToList();

            return Result<IReadOnlyList<ContractResponse>>.Success(response);
        }
    }
}
