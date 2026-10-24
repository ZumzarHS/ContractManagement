using Application.Suppliers.Common;
using Application.Suppliers.CreateSupplier;
using System.Net;
using System.Net.Http.Json;

namespace Tests.Integration.Suppliers;


    [Collection("Integration tests")]
    public class GetSupplierByIdTests : BaseIntegrationTest
    {
        public GetSupplierByIdTests(IntegrationTestWebAppFactory factory) : base(factory)
        {
        }
        [Fact]
        public async Task GetSupplierById_ShouldReturnSupplier_WhenSupplierExists()
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

            var supplierId = await createResponse.Content
                .ReadFromJsonAsync<Guid>();

            // Act
            var response = await Client.GetAsync($"/api/suppliers/{supplierId}");

            // Assert 1: Kontrollér statuskode og indhold
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var supplier = await response.Content.ReadFromJsonAsync<SupplierResponse>();

            Assert.NotNull(supplier);
            Assert.NotEqual(Guid.Empty, supplierId);
            Assert.Equal(supplierId, supplier.SupplierId);
            Assert.Equal("Test Leverandør A/S", supplier.Name);
        }
        [Fact]
        public async Task GetSupplierById_ShouldReturnNotFound_WhenSupplierDoesNotExist()
        {
            // Arrange
            var supplierId = Guid.NewGuid();

            // Act
            var response = await Client.GetAsync(
                $"/api/suppliers/{supplierId}");

            // Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }

