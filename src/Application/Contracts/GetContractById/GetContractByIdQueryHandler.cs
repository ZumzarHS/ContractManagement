using Application.Interfaces;
using ContractManagement.Domain.Entities;
using Application.Common.Results;

namespace Application.Contracts.GetContractById
{
    public class GetContractByIdQueryHandler
    {
        private readonly IContractRepository _contracts;

        public GetContractByIdQueryHandler(IContractRepository contracts)
        {
            _contracts = contracts;
        }
        public async Task<Result<Contract>> Handle(GetContractByIdQuery query, CancellationToken ct)
        {
           var contract = await _contracts.GetByIdAsync(query.ContractId, ct);
            if (contract == null)
            {
                return Result<Contract>.Failure(
                    ContractErrors.NotFound(query.ContractId));
            }
           
            return Result<Contract>.Success(contract);
        }
    }
}
