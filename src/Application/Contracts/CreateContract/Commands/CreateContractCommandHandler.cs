using Application.Interfaces;
using ContractManagement.Domain.Entities;

namespace Application.Contracts.CreateContract.Commands
{
    public class CreateContractCommandHandler
    {
        private readonly IContractRepository _contracts;

        public CreateContractCommandHandler(IContractRepository contracts)
        {
            _contracts = contracts;
        }

        public async Task<Guid> Handle(CreateContractCommand command, CancellationToken ct)
        {
            var contract = Contract.Create(
                command.SupplierId, 
                command.Title, 
                command.Description, 
                command.StartDate, 
                command.EndDate,                     
                command.ActionDate,
                command.NoticePeriodValue,
                command.NoticePeriodUnit
                );

            foreach (var line in command.ContractLines)
            {
                ContractLine contractLine = ContractLine.Create(
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
                    );
                contract.AddLine(contractLine);
            }
            
            await _contracts.AddAsync(contract, ct);
            return contract.ContractId;
        }
    }
}
