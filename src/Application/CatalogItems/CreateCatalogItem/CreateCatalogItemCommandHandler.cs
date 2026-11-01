using Application.CatalogItems.Common;
using Application.Common.Results;
using Application.Interfaces;
using ContractManagement.Domain.Entities;

namespace Application.CatalogItems.CreateCatalogItem;

public class CreateCatalogItemCommandHandler
{
    private readonly ICatalogItemRepository _catalogItems;

    public CreateCatalogItemCommandHandler(ICatalogItemRepository catalogItems)
    {
        _catalogItems = catalogItems;
    }

    public async Task<Result<Guid>> Handle(
        CreateCatalogItemCommand command,
        CancellationToken ct)
    {
        var catalogItem = new CatalogItem
        {
            CatalogItemId = Guid.NewGuid(),
            Name = command.Name,
            Description = command.Description,
            Type = command.Type
        };

        await _catalogItems.AddAsync(catalogItem, ct);

        return Result<Guid>.Success(catalogItem.CatalogItemId);
    }
}
