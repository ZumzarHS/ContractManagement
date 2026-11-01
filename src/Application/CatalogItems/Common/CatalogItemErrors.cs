using Application.Common.Results;

namespace Application.CatalogItems.Common;

public static class CatalogItemErrors
{
    public static Error NotFound(Guid catalogItemId) =>
        new(
            "CatalogItems.NotFound",
            $"CatalogItem with ID '{catalogItemId}' was not found.",
            ErrorType.NotFound);
}
