using Application.CatalogItems.Common;
using Application.Common.Results;
using Application.Interfaces;

namespace Application.CatalogItems.GetCatalogItemById;

public class GetCatalogItemByIdQueryHandler
{
    private readonly ICatalogItemRepository _catalogItems;

    public GetCatalogItemByIdQueryHandler(ICatalogItemRepository catalogItems)
    {
        _catalogItems = catalogItems;
    }

    public async Task<Result<CatalogItemResponse>> Handle(
        GetCatalogItemByIdQuery query,
        CancellationToken ct)
    {
        var catalogItem = await _catalogItems.GetByIdAsync(query.CatalogItemId, ct);

        if (catalogItem is null)
        {
            return Result<CatalogItemResponse>.Failure(
                CatalogItemErrors.NotFound(query.CatalogItemId));
        }

        var response = new CatalogItemResponse(
            catalogItem.CatalogItemId,
            catalogItem.Name,
            catalogItem.Description,
            catalogItem.Type);

        return Result<CatalogItemResponse>.Success(response);
    }
}
