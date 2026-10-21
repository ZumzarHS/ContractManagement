using ContractManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Tests.Integration;

public abstract class BaseIntegrationTest : IClassFixture<IntegrationTestWebAppFactory>, IAsyncLifetime
{
    private readonly IntegrationTestWebAppFactory _factory;
    private readonly IServiceScope _scope;
    protected HttpClient Client { get; }
    protected AppDbContext DbContext { get; }

    protected BaseIntegrationTest(IntegrationTestWebAppFactory factory)
    {
        _factory = factory;
        Client = factory.CreateClient();
        _scope = factory.Services.CreateScope();
        DbContext = _scope.ServiceProvider.GetRequiredService<AppDbContext>();
    }

    public virtual Task InitializeAsync() => Task.CompletedTask;

    // Nulstiller al data sikkert via Respawn efter hver test
    public virtual async Task DisposeAsync()
    {
        Client.Dispose();
        _scope.Dispose();
        
        await _factory.ResetDatabaseAsync();
    }
}