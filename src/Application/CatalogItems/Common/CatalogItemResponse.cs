using ContractManagement.Domain.Enums;

namespace Application.CatalogItems.Common;

public sealed record CatalogItemResponse(
    Guid CatalogItemId,
    string Name,
    string? Description,
    CatalogItemType Type
);
