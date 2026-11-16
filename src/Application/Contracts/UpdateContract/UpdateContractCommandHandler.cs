using Application.Common.Results;
using Application.Interfaces;
using ContractManagement.Domain.Entities;

namespace Application.Contracts.UpdateContract
{
    public sealed class UpdateContractCommandHandler
    {
        private readonly IContractRepository _contractRepository;

        public UpdateContractCommandHandler(IContractRepository contractRepository)
        {
            _contractRepository = contractRepository;
        }

        public async Task<Result> Handle(UpdateContractCommand command, CancellationToken ct)
        {
            var contract = await _contractRepository.GetByIdAsync(command.ContractId, ct);
            if (contract is null)
                return Result.Failure(Error.NotFound);

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
                    Console.WriteLine($"New line: {newContractLine.ContractLineId}");
                }

            foreach (var line in linesToRemove)
            {
                contract.RemoveLine(line);
            }


            await _contractRepository.SaveChangesAsync(ct);
            return Result.Success();
        }

    }
}
