using Application.Suppliers.CreateSupplier;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Http.Json;

namespace Tests.Integration.Suppliers;

[Collection("Integration tests")]

public class CreateSupplierTests : BaseIntegrationTest
{
    public CreateSupplierTests(IntegrationTestWebAppFactory factory) : base(factory)
    {
    }

    [Fact]
    public async Task Create_ShouldCreateSupplier()
    {
        // Arrange: 1. Opret de nødvendige relaterede entiteter i SQL Server
        var command = new CreateSupplierCommand(
               Name: "Test Leverandør A/S",
               Address: "Testvej 1, 9000 Aalborg",
               Cvr: "12345679",
               ContactPerson: null,
               Email: null,
               PhoneNumber: null
               );

        // Act: Send HTTP-request til API'en
        var response = await Client.PostAsJsonAsync(
            "/api/suppliers",
            command
        );

        // Assert: 1. Kontrollér HTTP-status
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var supplierId = await response.Content.ReadFromJsonAsync<Guid>();
        Assert.NotEqual(Guid.Empty, supplierId);

        // Assert 2: Hent supplieren fra databasen og kontrollér dens egenskaber
        var savedSupplier = await DbContext.Suppliers
            .AsNoTracking()
            .SingleOrDefaultAsync(s => s.SupplierId == supplierId);

        Assert.NotNull(savedSupplier);
        Assert.Equal("Test Leverandør A/S", savedSupplier.Name);
        Assert.Equal("12345679", savedSupplier.Cvr);
    }
}