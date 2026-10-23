using Application.Contracts.CreateContract;
using Application.Contracts.GetContractById;
using Application.Contracts.GetContracts;
using Application.Suppliers.CreateSupplier;
using Microsoft.Extensions.DependencyInjection;

namespace ContractManagement.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Contracts
        services.AddScoped<CreateContractCommandHandler>();
        services.AddScoped<GetContractByIdQueryHandler>();
        services.AddScoped<GetContractsQueryHandler>();

        // Suppliers
        services.AddScoped<CreateSupplierCommandHandler>();

        return services;
    }
}
