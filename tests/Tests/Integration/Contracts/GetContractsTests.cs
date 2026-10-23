using Application.Contracts.Common;
using Application.Contracts.CreateContract;
using ContractManagement.Domain.Entities;
using ContractManagement.Domain.Enums;
using System.Net;
using System.Net.Http.Json;

namespace Tests.Integration.Contracts
{
    [Collection("Integration tests")]
    public class GetContractsTests : BaseIntegrationTest
    {
        public GetContractsTests(IntegrationTestWebAppFactory factory) : base(factory)
        {
        }

        [Fact]
        public async Task GetContracts_ShouldReturnContracts_WhenContractsExist()
        {
            // Arrange
            var supplier = new Supplier
            {
                SupplierId = Guid.NewGuid(),
                Name = "Test Leverandør A/S",
                Address = "Testvej 1, 9000 Aalborg",
                Cvr = "12345679",
                Status = SupplierStatus.Active
            };
            DbContext.Suppliers.Add(supplier);
            await DbContext.SaveChangesAsync();
            var command = new CreateContractCommand(
                SupplierId: supplier.SupplierId,
                Title: "Test contract",
                Description: "Contract for integration testing",
                StartDate: new DateOnly(2026, 1, 1),
                EndDate: new DateOnly(2027, 1, 1),
                ActionDate: new DateOnly(2026, 11, 1),
                NoticePeriodValue: 3,
                NoticePeriodUnit: NoticePeriodUnit.Months,
                ContractLines: []);
            var createResponse = await Client.PostAsJsonAsync(
                "/api/contracts",
                command);
            createResponse.EnsureSuccessStatusCode();
            var contractId = await createResponse.Content.ReadFromJsonAsync<Guid>();
            // Act
            var response = await Client.GetAsync("/api/contracts");
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var contracts = await response.Content.ReadFromJsonAsync<List<ContractResponse>>();
            Assert.NotNull(contracts);
            Assert.NotEmpty(contracts);
            Assert.Contains(contracts, c => c.ContractId == contractId);
        }
        [Fact]
        public async Task GetContracts_ShouldReturnEmptyList_WhenNoContractsExist()
        {
            // Act
            var response = await Client.GetAsync("/api/contracts");
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var contracts = await response.Content.ReadFromJsonAsync<List<ContractResponse>>();
            Assert.NotNull(contracts);
            Assert.Empty(contracts);
        }
    }
}
