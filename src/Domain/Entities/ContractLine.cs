using ContractManagement.Domain.Enums;

namespace ContractManagement.Domain.Entities
{
    public class ContractLine
    {
        public Guid ContractLineId { get; set; }
        public string? Producer { get; set; }
        public string? Model { get; set; }
        public decimal Price { get; set; }
        public int? Quantity { get; set; }
        public string? Description { get; set; }
        public decimal? InitialAmount { get; set; }
        public int? DeliveryFrequencyInterval { get; set; }
        public FrequencyUnit? DeliveryFrequencyUnit { get; set; }

        public int PaymentFrequencyInterval { get; set; }
        public FrequencyUnit PaymentFrequencyUnit { get; set; }
        public Guid ContractId { get; set; }
        public Contract Contract { get; set; } = null!;
        public Guid CatalogItemId { get; set; }
        public CatalogItem CatalogItem { get; set; } = null!;
    }
}
