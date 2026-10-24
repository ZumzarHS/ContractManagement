using Microsoft.Extensions.DependencyInjection;
using Application.Contracts.CreateContract;
using Application.Contracts.GetContractById;
using Application.Contracts.GetContracts;
using Application.Suppliers.CreateSupplier;
using Application.Suppliers.GetSupplierById;
using Application.Suppliers.GetSuppliers;

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
        services.AddScoped<GetSupplierByIdQueryHandler>();
        services.AddScoped<GetSuppliersQueryHandler>();

        return services;
    }
}
