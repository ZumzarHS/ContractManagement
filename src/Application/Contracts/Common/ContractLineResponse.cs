using ContractManagement.Domain.Enums;

namespace Application.Contracts.Common;

public sealed record ContractLineResponse(
    Guid ContractLineId,
    Guid CatalogItemId,
    string CatalogItemName,
    string? Producer,
    string? Model,
    decimal Price,
    int? Quantity,
    string? Description,
    decimal? InitialAmount,
    int? DeliveryFrequencyInterval,
    FrequencyUnit? DeliveryFrequencyUnit,
    int PaymentFrequencyInterval,
    FrequencyUnit PaymentFrequencyUnit
);