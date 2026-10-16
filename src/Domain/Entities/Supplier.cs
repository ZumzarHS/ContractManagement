using ContractManagement.Domain.Enums;

namespace ContractManagement.Domain.Entities
{
    public class Supplier
    {
        public Guid SupplierId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Cvr { get; set; } = string.Empty;
        public string? ContactPerson { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        public SupplierStatus Status { get; set; } = SupplierStatus.Active;
    }
}
