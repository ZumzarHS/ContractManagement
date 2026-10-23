using Application.Common.Results;

namespace Application.Contracts.GetContractById;

public static class ContractErrors
{
    public static Error NotFound(Guid contractId) =>
        new(
            "Contracts.NotFound",
            $"Contract with ID '{contractId}' was not found.",
            ErrorType.NotFound);
}