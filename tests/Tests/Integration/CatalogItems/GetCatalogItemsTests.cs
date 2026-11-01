using Application.CatalogItems.Common;
using Application.CatalogItems.CreateCatalogItem;
using ContractManagement.Domain.Enums;
using System.Net;
using System.Net.Http.Json;

namespace Tests.Integration.CatalogItems;

[Collection("Integration tests")]
public class GetCatalogItemsTests : BaseIntegrationTest
{
    public GetCatalogItemsTests(IntegrationTestWebAppFactory factory) : base(factory)
    {
    }

    [Fact]
    public async Task GetCatalogItems_ShouldReturnCatalogItems_WhenCatalogItemsExist()
    {
        // Arrange
        var command = new CreateCatalogItemCommand(
            Name: "Testprodukt",
            Description: "Produkt til integrationstest",
            Type: CatalogItemType.Product);

        var createResponse = await Client.PostAsJsonAsync("/api/catalogitems", command);
        createResponse.EnsureSuccessStatusCode();

        var catalogItemId = await createResponse.Content.ReadFromJsonAsync<Guid>();

        // Act
        var response = await Client.GetAsync("/api/catalogitems");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var catalogItems = await response.Content.ReadFromJsonAsync<List<CatalogItemResponse>>();
        Assert.NotNull(catalogItems);
        Assert.NotEmpty(catalogItems);
        Assert.Contains(catalogItems, ci => ci.CatalogItemId == catalogItemId);
    }

    [Fact]
    public async Task GetCatalogItems_ShouldReturnEmptyList_WhenNoCatalogItemsExist()
    {
        // Act
        var response = await Client.GetAsync("/api/catalogitems");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var catalogItems = await response.Content.ReadFromJsonAsync<List<CatalogItemResponse>>();
        Assert.NotNull(catalogItems);
        Assert.Empty(catalogItems);
    }
}
