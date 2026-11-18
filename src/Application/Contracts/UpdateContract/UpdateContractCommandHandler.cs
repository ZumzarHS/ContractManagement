using Application.Common.Results;
using Application.Contracts.Common;
using Application.Interfaces;
using ContractManagement.Domain.Entities;
using ContractManagement.Domain.Enums;

namespace Application.Contracts.UpdateContract
{
    public sealed class UpdateContractCommandHandler
    {
        private readonly IContractRepository _contractRepository;
        private readonly IEmployeeRepository _employees;

        public UpdateContractCommandHandler(
            IContractRepository contractRepository,
            IEmployeeRepository employees)
        {
            _contractRepository = contractRepository;
            _employees = employees;
        }

        public async Task<Result> Handle(UpdateContractCommand command, CancellationToken ct)
        {
            if (await _employees.GetByIdAsync(command.EmployeeId, ct) is null)
            {
                return Result.Failure(
                    ContractHistoryErrors.EmployeeNotFound(command.EmployeeId));
            }

            var contract = await _contractRepository.GetByIdAsync(command.ContractId, ct);
            if (contract is null)
                return Result.Failure(Error.NotFound);

            var oldValue = ContractSnapshot.Serialize(contract);

            contract.UpdateDetails(
                command.SupplierId,
                command.Title,
                command.Description,
                command.StartDate,
                command.EndDate,
                command.ActionDate,
                command.NoticePeriodValue,
                command.NoticePeriodUnit
            );

            var linesToRemove = contract.ContractLines.Where(existingLine =>
                !command.ContractLines.Any(requestLine =>
                requestLine.ContractLineId.HasValue &&
                requestLine.ContractLineId == existingLine.ContractLineId)).ToList();

            foreach (var line in command.ContractLines)
                if (line.ContractLineId.HasValue)
                {
                    var contractLine = contract.ContractLines
                        .FirstOrDefault(cl =>
                            cl.ContractLineId == line.ContractLineId.Value);

                    if (contractLine is null)
                        return Result.Failure(Error.NotFound);

                    contractLine.UpdateDetails(
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
                }
                else
                {
                    var newContractLine = ContractLine.Create(
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
                    contract.AddLine(newContractLine);
                }

            foreach (var line in linesToRemove)
            {
                contract.RemoveLine(line);
            }

            var history = ContractHistory.Create(
                contract.ContractId,
                command.EmployeeId,
                HistoryActionType.ContractUpdated,
                "Contract updated",
                oldValue,
                ContractSnapshot.Serialize(contract));
            contract.AddHistory(history);
            await _contractRepository.AddHistoryAsync(history,ct);

            await _contractRepository.SaveChangesAsync(ct);
            return Result.Success();
        }

    }
}
