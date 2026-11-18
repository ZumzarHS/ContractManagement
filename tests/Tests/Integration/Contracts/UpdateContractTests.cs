using Application.Contracts.CreateContract;
using Application.Contracts.UpdateContract;
using ContractManagement.Domain.Entities;
using ContractManagement.Domain.Enums;
using Api.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Http.Json;

namespace Tests.Integration.Contracts;

[Collection("Integration tests")]
public class UpdateContractTests : BaseIntegrationTest
{
    public UpdateContractTests(IntegrationTestWebAppFactory factory) : base(factory)
    {
    }

    [Fact]
    public async Task Update_ShouldUpdateContractAndContractLines()
    {
        // Arrange: Opret de nødvendige relaterede entiteter Supplier og CatalogItem
        var supplier = Supplier.Create(
               name: "Test Leverandør A/S",
               address: "Testvej 1, 9000 Aalborg",
               cvr: "12345679",
               contactPerson: null,
               email: null,
               phoneNumber: null
               );

        var catalogItem = new CatalogItem
        {
            CatalogItemId = Guid.NewGuid(),
            Name = "Testprodukt",
            Type = CatalogItemType.Product,
            Description = "Produkt til integrationstest"
        };

        DbContext.Suppliers.Add(supplier);
        DbContext.CatalogItems.Add(catalogItem);
        await EnsureEmployeeExists(
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Anders Andersen",
            "anders@example.com");
        await EnsureEmployeeExists(
            Guid.Parse("22222222-2222-2222-2222-222222222222"),
            "Bo Hansen",
            "bo@example.com");
        var employeeA = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var employeeB = Guid.Parse("22222222-2222-2222-2222-222222222222");
        await DbContext.SaveChangesAsync();

        // Arrange: Opret kontrakt via API med to kontraktlinjer
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
                ),
                new(
                    CatalogItemId: catalogItem.CatalogItemId,
                    Producer: "Testproducent2",
                    Model: "Model Y",
                    Price: 1250.50m,
                    Quantity: 3,
                    Description: "Tre enheder af testproduktet",
                    InitialAmount: null,
                    DeliveryFrequencyInterval: null,
                    DeliveryFrequencyUnit: null,
                    PaymentFrequencyInterval: 1,
                    PaymentFrequencyUnit: FrequencyUnit.Month
                )
            },
            EmployeeId: employeeA
        );

        // Act: Send POST HTTP-request til API'en
        var response = await Client.PostAsJsonAsync(
            "/api/contracts",
            command
        );
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        // Arrange: Hent kontrakt og opdater med nye værdier
        var contractId = await response.Content.ReadFromJsonAsync<Guid>();
        Assert.NotEqual(Guid.Empty, contractId);
        DbContext.ChangeTracker.Clear();

        var originalContract = await DbContext.Contracts
            .Include(c => c.ContractLines)
            .FirstAsync(c => c.ContractId == contractId);

        var originalLines = originalContract.ContractLines.ToList();
        var lineToUpdate = originalLines.Single(cl => cl.Model == "Model X");
        var lineToDelete = originalLines.Single(cl => cl.Model == "Model Y");

        var updateRequest = new UpdateContractRequest(
            SupplierId: supplier.SupplierId,
            Title: "Opdateret testkontrakt",
            Description: "Opdateret integrationstest",
            StartDate: new DateOnly(2026, 2, 1),
            EndDate: new DateOnly(2027, 2, 1),
            ActionDate: new DateOnly(2026, 12, 1),
            NoticePeriodValue: 4,
            NoticePeriodUnit: NoticePeriodUnit.Months,
            EmployeeId: employeeB,
            ContractLines: new List<UpdateContractLineRequest>
            {
                new(
                    ContractLineId: lineToUpdate.ContractLineId,
                    CatalogItemId: catalogItem.CatalogItemId,
                    Producer: "Opdateret producent",
                    Model: "Opdateret model",
                    Price: 2000m,
                    Quantity: 4,
                    Description: "Opdateret beskrivelse",
                    InitialAmount: null,
                    DeliveryFrequencyInterval: null,
                    DeliveryFrequencyUnit: null,
                    PaymentFrequencyInterval: 1,
                    PaymentFrequencyUnit: FrequencyUnit.Month
                ),
                new(
                    ContractLineId: null,
                    CatalogItemId: catalogItem.CatalogItemId,
                    Producer: "Ny producent",
                    Model: "Ny model",
                    Price: 1500m,
                    Quantity: 5,
                    Description: "Ny kontraktlinje",
                    InitialAmount: null,
                    DeliveryFrequencyInterval: null,
                    DeliveryFrequencyUnit: null,
                    PaymentFrequencyInterval: 1,
                    PaymentFrequencyUnit: FrequencyUnit.Month
                )
            }
        );

        // Act: Send HTTP-request til API'en for at opdatere kontrakten
        var updateResponse = await Client.PutAsJsonAsync(
            $"/api/contracts/{contractId}",
            updateRequest
        );
        var errorContent = await updateResponse.Content.ReadAsStringAsync();

        Assert.True(
            updateResponse.StatusCode == HttpStatusCode.NoContent,
            $"Expected NoContent but got {updateResponse.StatusCode}: {errorContent}");
        DbContext.ChangeTracker.Clear();

        var updatedContract = await DbContext.Contracts
            .Include(c => c.ContractLines)
            .FirstAsync(c => c.ContractId == contractId);

        // Assert: Kontroller, at opdateringen lykkedes
        Assert.Equal("Opdateret testkontrakt", updatedContract.Title);
        Assert.Equal("Opdateret integrationstest", updatedContract.Description);
        Assert.Equal(new DateOnly(2026, 2, 1), updatedContract.StartDate);
        Assert.Equal(new DateOnly(2027, 2, 1), updatedContract.EndDate);
        Assert.Equal(new DateOnly(2026, 12, 1), updatedContract.ActionDate);
        Assert.Equal(4, updatedContract.NoticePeriodValue);
        Assert.Equal(NoticePeriodUnit.Months, updatedContract.NoticePeriodUnit);

        // Kontroller, at der stadig er præcis to kontraktlinjer
        Assert.Equal(2, updatedContract.ContractLines.Count);

        // Kontroller, at den eksisterende kontraktlinje er opdateret
        var updatedLine = Assert.Single(updatedContract.ContractLines, 
            cl => cl.ContractLineId == lineToUpdate.ContractLineId);
        Assert.Equal("Opdateret producent", updatedLine.Producer);
        Assert.Equal("Opdateret model", updatedLine.Model);
        Assert.Equal(2000m, updatedLine.Price);
        Assert.Equal(4, updatedLine.Quantity);
        Assert.Equal("Opdateret beskrivelse", updatedLine.Description);

        // Kontroller, at den nye kontraktlinje er blevet tilføjet
        var newLine = Assert.Single(updatedContract.ContractLines, cl => cl.Model == "Ny model");
        Assert.Equal("Ny producent", newLine.Producer);
        Assert.Equal(1500m, newLine.Price);
        Assert.Equal(5, newLine.Quantity);
        Assert.Equal("Ny kontraktlinje", newLine.Description);

        // Kontroller, at den udeladte kontraktlinje er blevet slettet
        Assert.DoesNotContain(
            updatedContract.ContractLines,
            cl => cl.ContractLineId == lineToDelete.ContractLineId
        );

        var history = await DbContext.ContractHistories
            .AsNoTracking()
            .Where(entry => entry.ContractId == contractId)
            .OrderBy(entry => entry.Timestamp)
            .ToListAsync();

        Assert.Equal(2, history.Count);

        var updateHistory = Assert.Single(
        history,
        entry => entry.ActionType == HistoryActionType.ContractUpdated);
        Assert.Equal(HistoryActionType.ContractUpdated, updateHistory.ActionType);
        Assert.Equal(employeeB, updateHistory.EmployeeId);
        Assert.Contains("Testkontrakt", updateHistory.OldValue);
        Assert.Contains("Opdateret testkontrakt", updateHistory.NewValue);

        Assert.Contains("Model X", updateHistory.OldValue);
        Assert.Contains("Model Y", updateHistory.OldValue);

        Assert.Contains("Opdateret model", updateHistory.NewValue);
        Assert.Contains("Ny model", updateHistory.NewValue);

        Assert.DoesNotContain("Model Y", updateHistory.NewValue);

        var createHistory = Assert.Single(
            history, 
            entry => entry.ActionType == HistoryActionType.ContractCreated);

        Assert.Equal(
            employeeA,
            createHistory.EmployeeId);

        Assert.Null(createHistory.OldValue);
        Assert.NotNull(createHistory.NewValue);
    }
}