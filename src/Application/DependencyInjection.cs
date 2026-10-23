using Application.Contracts.CreateContract;
using Application.Contracts.GetContractById;
using Microsoft.Extensions.DependencyInjection;

namespace ContractManagement.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<CreateContractCommandHandler>();
        services.AddScoped<GetContractByIdQueryHandler>();

        return services;
    }
}
