using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ContractManagement.Domain.Entities;

namespace Infrastructure.Persistence.Configurations
{
    public class CatalogItemConfiguration : IEntityTypeConfiguration<CatalogItem>
    {
        public void Configure(EntityTypeBuilder<CatalogItem> builder)
        {
            builder.HasKey(ci => ci.CatalogItemId);

            builder.Property(ci => ci.Name)
           .IsRequired()
           .HasMaxLength(100);

            builder.Property(ci => ci.Description)
           .HasMaxLength(1000);
        }
    }
}
