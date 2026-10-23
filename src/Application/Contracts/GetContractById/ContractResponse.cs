using ContractManagement.Domain.Enums;
namespace Application.Contracts.GetContractById;


public sealed record ContractResponse(
    Guid ContractId,
    string Title,
    string? Description,
    DateOnly StartDate,
    DateOnly? EndDate,
    DateOnly? ActionDate,
    int? NoticePeriodValue,
    NoticePeriodUnit? NoticePeriodUnit,
    ContractStatus ContractStatus,
    ActionStatus ActionStatus,
    Guid SupplierId
);
