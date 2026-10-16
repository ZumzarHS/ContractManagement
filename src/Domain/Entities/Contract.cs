using ContractManagement.Domain.Enums;

namespace ContractManagement.Domain.Entities
{
    public class Contract
    {
        public Guid ContractId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? NoticePeriodValue { get; set; }
        public NoticePeriodUnit? NoticePeriodUnit { get; set; }
        public ContractStatus ContractStatus { get; set; }
        public ActionStatus ActionStatus { get; set; }
        public Guid SupplierId { get; set; }
        public Supplier Supplier { get; set; } = null!;
        public Guid? PreviousContractId { get; set; }
        public Contract? PreviousContract { get; set; }

        public ICollection<ContractLine> ContractLines { get; set; } = new List<ContractLine>();
    }
}
