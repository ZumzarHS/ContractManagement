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
    }
}
