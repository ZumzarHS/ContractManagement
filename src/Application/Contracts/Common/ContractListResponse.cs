using ContractManagement.Domain.Enums;

namespace Application.Contracts.Common;

public sealed record ContractListResponse(
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
    Guid SupplierId,
    string SupplierName
);