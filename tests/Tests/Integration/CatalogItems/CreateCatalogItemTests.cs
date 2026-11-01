using Application.CatalogItems.CreateCatalogItem;
using ContractManagement.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Http.Json;

namespace Tests.Integration.CatalogItems;

[Collection("Integration tests")]
public class CreateCatalogItemTests : BaseIntegrationTest
{
    public CreateCatalogItemTests(IntegrationTestWebAppFactory factory) : base(factory)
    {
    }

    [Fact]
    public async Task Create_ShouldCreateCatalogItem()
    {
        // Arrange
        var command = new CreateCatalogItemCommand(
            Name: "Testprodukt",
            Description: "Produkt til integrationstest",
            Type: CatalogItemType.Product);

        // Act
        var response = await Client.PostAsJsonAsync("/api/catalogitems", command);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var catalogItemId = await response.Content.ReadFromJsonAsync<Guid>();
        Assert.NotEqual(Guid.Empty, catalogItemId);

        var savedCatalogItem = await DbContext.CatalogItems
            .AsNoTracking()
            .SingleOrDefaultAsync(ci => ci.CatalogItemId == catalogItemId);

        Assert.NotNull(savedCatalogItem);
        Assert.Equal("Testprodukt", savedCatalogItem.Name);
        Assert.Equal(CatalogItemType.Product, savedCatalogItem.Type);
        Assert.Equal("Produkt til integrationstest", savedCatalogItem.Description);
    }
}
