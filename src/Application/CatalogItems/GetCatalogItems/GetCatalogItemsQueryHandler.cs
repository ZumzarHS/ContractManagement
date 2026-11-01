using Application.CatalogItems.Common;
using Application.Common.Results;
using Application.Interfaces;

namespace Application.CatalogItems.GetCatalogItems;

public sealed class GetCatalogItemsQueryHandler
{
    private readonly ICatalogItemRepository _catalogItems;

    public GetCatalogItemsQueryHandler(ICatalogItemRepository catalogItems)
    {
        _catalogItems = catalogItems;
    }

    public async Task<Result<IReadOnlyList<CatalogItemResponse>>> Handle(
        GetCatalogItemsQuery query,
        CancellationToken ct)
    {
        var catalogItems = await _catalogItems.GetAllAsync(ct);

        var response = catalogItems
            .Select(catalogItem => new CatalogItemResponse(
                catalogItem.CatalogItemId,
                catalogItem.Name,
                catalogItem.Description,
                catalogItem.Type))
            .ToList();

        return Result<IReadOnlyList<CatalogItemResponse>>.Success(response);
    }
}
