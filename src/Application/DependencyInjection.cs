using Application.Contracts.CreateContract;
using Microsoft.Extensions.DependencyInjection;

namespace ContractManagement.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<CreateContractCommandHandler>();

        return services;
    }
}
