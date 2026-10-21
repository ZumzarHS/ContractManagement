using ContractManagement.Domain.Enums;

namespace Application.Contracts.CreateContract.Commands;

public record CreateContractCommand(
    Guid SupplierId,
    string Title,
    string? Description,
    DateOnly StartDate,
    DateOnly? EndDate,
    DateOnly? ActionDate,
    int? NoticePeriodValue,
    NoticePeriodUnit? NoticePeriodUnit,
    IReadOnlyList<CreateContractLineInput> ContractLines
);

public record CreateContractLineInput(
    Guid CatalogItemId,
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