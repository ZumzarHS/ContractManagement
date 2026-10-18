using ContractManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContractManagement.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Contract> Contracts => Set<Contract>();
    public DbSet<ContractLine> ContractLines => Set<ContractLine>();
    public DbSet<Supplier> Suppliers => Set<Supplier>();
    public DbSet<CatalogItem> CatalogItems => Set<CatalogItem>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<ContractHistory> ContractHistories => Set<ContractHistory>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}


