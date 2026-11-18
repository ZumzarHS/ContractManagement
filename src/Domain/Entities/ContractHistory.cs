using ContractManagement.Domain.Enums;

namespace ContractManagement.Domain.Entities
{
    public class ContractHistory
    {
        public Guid ContractHistoryId { get; private set; }
        public DateTime Timestamp { get; private set; }
        public HistoryActionType ActionType { get; private set; }
        public string? Description { get; private set; }
        public string? OldValue { get; private set; }
        public string? NewValue { get; private set; }
        public Guid ContractId { get; private set; }
        public Guid EmployeeId { get; private set; }
        public Contract Contract { get; private set; } = null!;
        public Employee Employee { get; private set; } = null!;

        private ContractHistory() { }

        public static ContractHistory Create(
            Guid contractId,
            Guid employeeId,
            HistoryActionType actionType,
            string description,
            string? oldValue,
            string? newValue)
        {
            if (contractId == Guid.Empty)
                throw new ArgumentException("ContractId is required.", nameof(contractId));

            if (employeeId == Guid.Empty)
                throw new ArgumentException("EmployeeId is required.", nameof(employeeId));

            return new ContractHistory
            {
                ContractHistoryId = Guid.NewGuid(),
                Timestamp = DateTime.UtcNow,
                ActionType = actionType,
                Description = description,
                OldValue = oldValue,
                NewValue = newValue,
                ContractId = contractId,
                EmployeeId = employeeId
            };
        }
    }
}
