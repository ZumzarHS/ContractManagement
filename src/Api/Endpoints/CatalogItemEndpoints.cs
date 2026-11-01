using Application.CatalogItems.CreateCatalogItem;
using Application.CatalogItems.GetCatalogItemById;
using Application.CatalogItems.GetCatalogItems;
using ContractManagement.Api.Common;

namespace ContractManagement.Api.Endpoints
{
    public static class CatalogItemEndpoints
    {
        public static void MapCatalogItemEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/api/catalogitems")
                .WithTags("CatalogItems");

            group.MapPost("", CreateCatalogItem);
            group.MapGet("/{catalogItemId:guid}", GetCatalogItemById);
            group.MapGet("/", GetCatalogItems);
        }

        private static async Task<IResult> CreateCatalogItem(
            CreateCatalogItemCommand command,
            CreateCatalogItemCommandHandler handler,
            CancellationToken ct)
        {
            var result = await handler.Handle(command, ct);

            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }

            return Results.Json(
                result.Value,
                statusCode: StatusCodes.Status201Created);
        }

        private static async Task<IResult> GetCatalogItemById(
            Guid catalogItemId,
            GetCatalogItemByIdQueryHandler handler,
            CancellationToken ct)
        {
            var result = await handler.Handle(new GetCatalogItemByIdQuery(catalogItemId), ct);

            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }

            return Results.Ok(result.Value);
        }

        private static async Task<IResult> GetCatalogItems(
            GetCatalogItemsQueryHandler handler,
            CancellationToken ct)
        {
            var result = await handler.Handle(new GetCatalogItemsQuery(), ct);

            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }

            return Results.Ok(result.Value);
        }
    }
}
