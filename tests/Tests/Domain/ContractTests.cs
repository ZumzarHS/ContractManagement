using ContractManagement.Domain.Entities;

namespace Tests.Domain;

public class ContractTests
{
    [Fact]
    public void Create_EndDateBeforeStartDate_ThrowsArgumentException()
    {
        // Arrange
        var supplierId = Guid.NewGuid();
        var startDate = new DateOnly(2027, 5, 1);
        var endDate = new DateOnly(2027, 4, 1);

        // Act & Assert
        Assert.Throws<ArgumentException>(() =>
            Contract.Create(
                supplierId,
                "Testkontrakt",
                null,
                startDate,
                endDate,
                null,
                null,
                null));
    }
    [Fact]
    public void Create_NoTitle_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() =>
            Contract.Create(
                Guid.NewGuid(),
                string.Empty,
                null,
                new DateOnly(2027, 4, 1),
                new DateOnly(2027, 5, 1),
                null,
                null,
                null));
    }
    [Fact]
    public void Create_EmptySupplierId_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() =>
            Contract.Create(
                Guid.Empty,
                "Testkontrakt",
                null,
                new DateOnly(2027, 4, 1),
                new DateOnly(2027, 5, 1),
                null,
                null,
                null));
    }
    [Fact]
    public void Create_ValidInput_CreatesContract()
    {
        var supplierId = Guid.NewGuid();
        var startDate = new DateOnly(2027, 4, 1);
        var endDate = new DateOnly(2027, 5, 1);

        var contract = Contract.Create(
            supplierId,
            "Testkontrakt",
            null,
            startDate,
            endDate,
            null,
            null,
            null);

        Assert.NotEqual(Guid.Empty, contract.ContractId);
        Assert.Equal(supplierId, contract.SupplierId);
        Assert.Equal("Testkontrakt", contract.Title);
        Assert.Equal(startDate, contract.StartDate);
        Assert.Equal(endDate, contract.EndDate);
    }
}
