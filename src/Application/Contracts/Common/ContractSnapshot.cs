using System.Text.Json;
using ContractManagement.Domain.Entities;

namespace Application.Contracts.Common;

public static class ContractSnapshot
{
    public static string Serialize(Contract contract)
    {
        var snapshot = new
        {
            contract.ContractId,
            contract.SupplierId,
            contract.Title,
            contract.Description,
            contract.StartDate,
            contract.EndDate,
            contract.ActionDate,
            contract.NoticePeriodValue,
            contract.NoticePeriodUnit,
            contract.ContractStatus,
            contract.ActionStatus,
            ContractLines = contract.ContractLines.Select(line => new
            {
                line.ContractLineId,
                line.CatalogItemId,
                line.Producer,
                line.Model,
                line.Price,
                line.Quantity,
                line.Description,
                line.InitialAmount,
                line.DeliveryFrequencyInterval,
                line.DeliveryFrequencyUnit,
                line.PaymentFrequencyInterval,
                line.PaymentFrequencyUnit
            })
        };

        return JsonSerializer.Serialize(snapshot);
    }
}
