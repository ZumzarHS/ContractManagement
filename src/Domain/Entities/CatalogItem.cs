using ContractManagement.Domain.Enums;

namespace ContractManagement.Domain.Entities
{
    public class CatalogItem
    {
        public Guid CatalogItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public CatalogItemType Type { get; set; }
    }
}
