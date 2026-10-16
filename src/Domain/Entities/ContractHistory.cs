using ContractManagement.Domain.Enums;

namespace ContractManagement.Domain.Entities
{
    public class ContractHistory
    {
        public Guid ContractHistoryId { get; set; }
        public DateTime Timestamp { get; set; }
        public HistoryActionType ActionType { get; set; }
        public string? Description { get; set; }
        public string? OldValue { get; set; }
        public string? NewValue { get; set; }
        public Guid ContractId { get; set; }
        public Guid EmployeeId { get; set; }
        public Contract Contract { get; set; } = null!;
        public Employee Employee { get; set; } = null!;

    }
}
