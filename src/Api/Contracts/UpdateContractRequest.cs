using ContractManagement.Domain.Enums;

namespace Api.Contracts
{
    public sealed record UpdateContractRequest(
    Guid SupplierId,
    string Title,
    string? Description,
    DateOnly StartDate,
    DateOnly? EndDate,
    DateOnly? ActionDate,
    int? NoticePeriodValue,
    NoticePeriodUnit? NoticePeriodUnit,
    List<UpdateContractLineRequest> ContractLines
);
    public sealed record UpdateContractLineRequest(
    Guid? ContractLineId,
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
}
