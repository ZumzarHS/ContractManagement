using Application.Interfaces;
using ContractManagement.Domain.Entities;
using Application.Common.Results;
using Application.Contracts.Common;
using ContractManagement.Domain.Enums;

namespace Application.Contracts.CreateContract
{
    public class CreateContractCommandHandler
    {
        private readonly IContractRepository _contracts;
        private readonly IEmployeeRepository _employees;

        public CreateContractCommandHandler(
            IContractRepository contracts,
            IEmployeeRepository employees)
        {
            _contracts = contracts;
            _employees = employees;
        }

        public async Task<Result<Guid>> Handle(CreateContractCommand command, CancellationToken ct)
        {
            if (await _employees.GetByIdAsync(command.EmployeeId, ct) is null)
            {
                return Result<Guid>.Failure(
                    ContractHistoryErrors.EmployeeNotFound(command.EmployeeId));
            }

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

            contract.AddHistory(ContractHistory.Create(
                contract.ContractId,
                command.EmployeeId,
                HistoryActionType.ContractCreated,
                "Contract created",
                oldValue: null,
                newValue: ContractSnapshot.Serialize(contract)));

            await _contracts.AddAsync(contract, ct);
            return Result<Guid>.Success(contract.ContractId);
        }
    }
}
