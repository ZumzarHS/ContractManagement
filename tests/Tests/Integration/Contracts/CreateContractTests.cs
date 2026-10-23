using Application.Contracts.CreateContract;
using ContractManagement.Domain.Entities;
using ContractManagement.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Http.Json;

namespace Tests.Integration.Contracts;

public class CreateContractTests : BaseIntegrationTest
{
    public CreateContractTests(IntegrationTestWebAppFactory factory) : base(factory)
    {
    }

    [Fact]
    public async Task Create_ShouldCreateContract()
    {
        // Arrange: 1. Opret de nødvendige relaterede entiteter i SQL Server
        var supplier = new Supplier
        {
            SupplierId = Guid.NewGuid(),
            Name = "Test Leverandør A/S",
            Address = "Testvej 1, 9000 Aalborg",
            Cvr = "12345678",
            Status = SupplierStatus.Active
        };

        DbContext.Suppliers.Add(supplier);

        // Arrange 2: Opret katalogvare
        var catalogItem = new CatalogItem
        {
            CatalogItemId = Guid.NewGuid(),
            Name = "Testprodukt",
            Type = CatalogItemType.Product,
            Description = "Produkt til integrationstest"
        };

        DbContext.CatalogItems.Add(catalogItem);

        await DbContext.SaveChangesAsync();

        // Arrange: 3. Opret command med de rigtige ID'er
        var command = new CreateContractCommand(
            SupplierId: supplier.SupplierId,
            Title: "Testkontrakt",
            Description: "Integrationstest",
            StartDate: new DateOnly(2026, 1, 1),
            EndDate: new DateOnly(2027, 1, 1),
            ActionDate: new DateOnly(2026, 11, 1),
            NoticePeriodValue: 3,
            NoticePeriodUnit: NoticePeriodUnit.Months,
            ContractLines: new List<CreateContractLineInput> 
            { 
                new(
                    CatalogItemId: catalogItem.CatalogItemId,
                    Producer: "Testproducent",
                    Model: "Model X",
                    Price: 1250.50m,
                    Quantity: 2,
                    Description: "To enheder af testproduktet",
                    InitialAmount: null,
                    DeliveryFrequencyInterval: null,
                    DeliveryFrequencyUnit: null,
                    PaymentFrequencyInterval: 1,
                    PaymentFrequencyUnit: FrequencyUnit.Month
                ) 
            }
        );

        // Act: Send HTTP-request til API'en
        var response = await Client.PostAsJsonAsync(
            "/api/contracts",
            command
        );

        // Assert: 1. Kontrollér HTTP-status
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var contractId = await response.Content.ReadFromJsonAsync<Guid>();
        Assert.NotEqual(Guid.Empty, contractId);

        // Assert 2: Hent kontrakten med dens kontraktlinjer
        var contract = await DbContext.Contracts
            .AsNoTracking()
            .Include(c => c.ContractLines)
            .ThenInclude(cl => cl.CatalogItem)
            .SingleOrDefaultAsync(c => c.ContractId == contractId);

        Assert.NotNull(contract);
        Assert.Equal("Testkontrakt", contract.Title);
        Assert.Equal(supplier.SupplierId, contract.SupplierId);

        // Assert 3: Kontrollér kontraktlinjen
        var contractLine = Assert.Single(contract.ContractLines);

        Assert.Equal(catalogItem.CatalogItemId, contractLine.CatalogItemId);
        Assert.Equal("Testproducent", contractLine.Producer);
        Assert.Equal("Model X", contractLine.Model);
        Assert.Equal(1250.50m, contractLine.Price);
        Assert.Equal(2, contractLine.Quantity);

        // Assert 4: Kontrollér relationen til katalogvaren
        Assert.NotNull(contractLine.CatalogItem);
        Assert.Equal("Testprodukt", contractLine.CatalogItem.Name);
    }
}