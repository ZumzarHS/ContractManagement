using NetArchTest.Rules;
using Xunit;
using ContractManagement.Domain.Entities;
using Application.Contracts.CreateContract.Commands;

namespace ContractManagement.Tests.Architecture;

public class ArchitectureTests
{
    [Fact]
    public void Domain_Should_Not_Reference_Application()
    {
        var result = Types
            .InAssembly(typeof(Contract).Assembly)
            .ShouldNot()
            .HaveDependencyOn(
                typeof(CreateContractCommand).Assembly.GetName().Name!)
            .GetResult();

        Assert.True(result.IsSuccessful);
    }
    /*
    [Fact]
    public void Domain_Should_Not_Reference_Infrastructure()
    {
        var result = Types
            .InAssembly(typeof(Contract).Assembly)
            .ShouldNot()
            .HaveDependencyOn(
                typeof(ContractManagementDbContext)
                    .Assembly.GetName().Name!)
            .GetResult();

        Assert.True(result.IsSuccessful);
    }

    [Fact]
    public void Application_Should_Not_Reference_Infrastructure()
    {
        var result = Types
            .InAssembly(typeof(CreateContractCommand).Assembly)
            .ShouldNot()
            .HaveDependencyOn(
                typeof(ContractManagementDbContext)
                    .Assembly.GetName().Name!)
            .GetResult();

        Assert.True(result.IsSuccessful);
    }*/
}