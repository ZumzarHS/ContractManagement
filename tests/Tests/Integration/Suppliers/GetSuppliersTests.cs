using Application.Suppliers.Common;
using Application.Suppliers.CreateSupplier;
using System.Net;
using System.Net.Http.Json;

namespace Tests.Integration.Suppliers
{
    [Collection("Integration tests")]
    public class GetSuppliersTests : BaseIntegrationTest
    {
        public GetSuppliersTests(IntegrationTestWebAppFactory factory) : base(factory)
        {
        }

        [Fact]
        public async Task GetSuppliers_ShouldReturnSuppliers_WhenSuppliersExist()
        {
            // Arrange
            var command = new CreateSupplierCommand(
                Name: "Test Leverandør A/S",
                Address: "Testvej 1, 9000 Aalborg",
                Cvr: "12345679",
                ContactPerson: null,
                Email: null,
                PhoneNumber: null
            );
            var createResponse = await Client.PostAsJsonAsync(
                "/api/suppliers",
                command);
            createResponse.EnsureSuccessStatusCode();
            var supplierId = await createResponse.Content.ReadFromJsonAsync<Guid>();

            // Act
            var response = await Client.GetAsync("/api/suppliers");
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var suppliers = await response.Content.ReadFromJsonAsync<List<SupplierResponse>>();
            Assert.NotNull(suppliers);
            Assert.NotEmpty(suppliers);
            Assert.Contains(suppliers, s => s.SupplierId == supplierId);
        }
        [Fact]
        public async Task GetSuppliers_ShouldReturnEmptyList_WhenNoSuppliersExist()
        {
            // Act
            var response = await Client.GetAsync("/api/suppliers");
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var suppliers = await response.Content.ReadFromJsonAsync<List<SupplierResponse>>();
            Assert.NotNull(suppliers);
            Assert.Empty(suppliers);
        }
    }
}
