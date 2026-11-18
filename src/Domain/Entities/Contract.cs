using ContractManagement.Domain.Enums;

namespace ContractManagement.Domain.Entities
{
    public class Contract
    {
        public Guid ContractId { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public string? Description { get; private set; }
        public DateOnly StartDate { get; private set; }
        public DateOnly? EndDate { get; private set; }
        public DateOnly? ActionDate { get; private set; }
        public int? NoticePeriodValue { get; private set; }
        public NoticePeriodUnit? NoticePeriodUnit { get; private set; }
        public ContractStatus ContractStatus { get; private set; }
        public ActionStatus ActionStatus { get; private set; }
        public Guid SupplierId { get; private set; }
        public Supplier Supplier { get; private set; } = null!;
        public Guid? PreviousContractId { get; private set; }
        public Contract? PreviousContract { get; private set; }

        public ICollection<ContractLine> ContractLines { get; private set; } = new List<ContractLine>();
        public ICollection<ContractHistory> History { get; private set; } = new List<ContractHistory>();

        // EF Core kan bruge denne constructor til at indlæse entiteter.
        private Contract() { }

        public static Contract Create(
            Guid supplierId,
            string title,
            string? description,
            DateOnly startDate,
            DateOnly? endDate,
            DateOnly? actionDate,
            int? noticePeriodValue,
            NoticePeriodUnit? noticePeriodUnit)
        {
            if (supplierId == Guid.Empty)
                throw new ArgumentException("SupplierId is required.");

            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title is required.");

            if (endDate.HasValue && endDate.Value < startDate)
                throw new ArgumentException(
                    "End date cannot be before start date.");

            var contract = new Contract
            {
                ContractId = Guid.NewGuid(),
                SupplierId = supplierId,
                Title = title,
                Description = description,
                StartDate = startDate,
                EndDate = endDate,
                ActionDate = actionDate,
                NoticePeriodValue = noticePeriodValue,
                NoticePeriodUnit = noticePeriodUnit,
                ContractStatus = startDate > DateOnly.FromDateTime(DateTime.UtcNow)
                    ? ContractStatus.Pending
                    : ContractStatus.Active,
                ActionStatus = ActionStatus.None
            };

            return contract;
        }
        public void UpdateDetails(
            Guid supplierId,
            string title,
            string? description,
            DateOnly startDate,
            DateOnly? endDate,
            DateOnly? actionDate,
            int? noticePeriodValue,
            NoticePeriodUnit? noticePeriodUnit)
        {
            if (supplierId == Guid.Empty)
                throw new ArgumentException("SupplierId is required.");

            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title is required.");

            if (endDate.HasValue && endDate.Value < startDate)
                throw new ArgumentException(
                    "End date cannot be before start date.");

            SupplierId = supplierId;
            Title = title;
            Description = description;
            StartDate = startDate;
            EndDate = endDate;
            ActionDate = actionDate;
            NoticePeriodValue = noticePeriodValue;
            NoticePeriodUnit = noticePeriodUnit;
        }

        public void AddLine(ContractLine line)
        {
            ArgumentNullException.ThrowIfNull(line);

            line.SetContract(this);
            ContractLines.Add(line);
        }

        public void RemoveLine(ContractLine line)
        {
            ArgumentNullException.ThrowIfNull(line);

            if (!ContractLines.Remove(line))
                throw new InvalidOperationException(
                    "Contract line does not belong to this contract.");
        }

        public void AddHistory(ContractHistory history)
        {
            ArgumentNullException.ThrowIfNull(history);
            History.Add(history);
        }

    }
}
