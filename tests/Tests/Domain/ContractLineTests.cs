using ContractManagement.Domain.Entities;
using ContractManagement.Domain.Enums;

namespace Tests.Domain;

public class ContractLineTests
{
    [Fact]
    public void Create_NoCatalogItemId_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() =>
        ContractLine.Create(
            Guid.Empty,
            null,
            null,
            10.02m,
            null,
            null,
            null,
            null,
            null,
            1,
            FrequencyUnit.Day));
    }
    [Fact]
    public void Create_PriceCantBeNegative_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() =>
        ContractLine.Create(
            Guid.NewGuid(),
            null,
            null,
            -10.02m,
            null,
            null,
            null,
            null,
            null,
            1,
            FrequencyUnit.Day));
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public void Create_InvalidQuantity_ThrowsArgumentException(int quantity)
    {
        Assert.Throws<ArgumentException>(() =>
            ContractLine.Create(
                Guid.NewGuid(),
                null,
                null,
                10.02m,
                quantity,
                null,
                null,
                null,
                null,
                1,
                FrequencyUnit.Day));
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public void Create_PaymentFrequencyMustBePositive_ThrowsArgumentException(int paymentFrequencyInterval)
    {
        Assert.Throws<ArgumentException>(() =>
        ContractLine.Create(
            Guid.NewGuid(),
            null,
            null,
            10.02m,
            null,
            null,
            null,
            null,
            null,
            paymentFrequencyInterval,
            FrequencyUnit.Day));
    }
    [Fact]
    public void Create_ValidInput_CreatesContractLine()
    {
        var catalogItemId = Guid.NewGuid();
        var price = 10.02m;
        var paymentFrequencyInterval = 1;
        var paymentFrequencyUnit = FrequencyUnit.Day;


        var cL = ContractLine.Create(
            catalogItemId,
            null,
            null,
            price,
            null,
            null,
            null,
            null,
            null,
            paymentFrequencyInterval,
            paymentFrequencyUnit);

        Assert.Equal(catalogItemId, cL.CatalogItemId);
        Assert.Equal(price, cL.Price);
        Assert.Equal(paymentFrequencyInterval, cL.PaymentFrequencyInterval);
        Assert.Equal(paymentFrequencyUnit, cL.PaymentFrequencyUnit);
    }
}
