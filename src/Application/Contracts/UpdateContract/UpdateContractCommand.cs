using ContractManagement.Domain.Enums;

namespace Application.Contracts.UpdateContract
{
    public sealed record UpdateContractCommand(
        Guid ContractId,
        Guid SupplierId,
        string Title,
        string? Description,
        DateOnly StartDate,
        DateOnly? EndDate,
        DateOnly? ActionDate,
        int? NoticePeriodValue,
        NoticePeriodUnit? NoticePeriodUnit,
        List<UpdateContractLineCommand> ContractLines,
        Guid EmployeeId
    );

    public sealed record UpdateContractLineCommand(
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