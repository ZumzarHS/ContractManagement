using Application.CatalogItems.Common;
using Application.CatalogItems.CreateCatalogItem;
using ContractManagement.Domain.Enums;
using System.Net;
using System.Net.Http.Json;

namespace Tests.Integration.CatalogItems;

[Collection("Integration tests")]
public class GetCatalogItemByIdTests : BaseIntegrationTest
{
    public GetCatalogItemByIdTests(IntegrationTestWebAppFactory factory) : base(factory)
    {
    }

    [Fact]
    public async Task GetCatalogItemById_ShouldReturnCatalogItem_WhenCatalogItemExists()
    {
        // Arrange
        var command = new CreateCatalogItemCommand(
            Name: "Test service",
            Description: "Service til integrationstest",
            Type: CatalogItemType.Service);

        var createResponse = await Client.PostAsJsonAsync("/api/catalogitems", command);
        createResponse.EnsureSuccessStatusCode();

        var catalogItemId = await createResponse.Content.ReadFromJsonAsync<Guid>();

        // Act
        var response = await Client.GetAsync($"/api/catalogitems/{catalogItemId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var catalogItem = await response.Content.ReadFromJsonAsync<CatalogItemResponse>();

        Assert.NotNull(catalogItem);
        Assert.NotEqual(Guid.Empty, catalogItemId);
        Assert.Equal(catalogItemId, catalogItem.CatalogItemId);
        Assert.Equal("Test service", catalogItem.Name);
        Assert.Equal(CatalogItemType.Service, catalogItem.Type);
    }

    [Fact]
    public async Task GetCatalogItemById_ShouldReturnNotFound_WhenCatalogItemDoesNotExist()
    {
        // Arrange
        var catalogItemId = Guid.NewGuid();

        // Act
        var response = await Client.GetAsync($"/api/catalogitems/{catalogItemId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
