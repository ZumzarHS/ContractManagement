using ContractManagement.Domain.Enums;

namespace Application.CatalogItems.CreateCatalogItem;

public record CreateCatalogItemCommand(
    string Name,
    string? Description,
    CatalogItemType Type
);
