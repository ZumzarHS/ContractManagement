using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ContractManagement.Domain.Entities;

namespace Infrastructure.Persistence.Configurations
{
    public class ContractLineConfiguration : IEntityTypeConfiguration<ContractLine>
    {
        public void Configure(EntityTypeBuilder<ContractLine> builder)
        {
            builder.HasKey(cl => cl.ContractLineId);

            builder.Property(cl => cl.Description)
           .HasMaxLength(1000);

            builder.Property(cl => cl.Price)
                .HasPrecision(18,2);

            builder.Property(cl => cl.InitialAmount)
                .HasPrecision(18,2);

            // ContractLine -> CatalogItem
            builder.HasOne(cl => cl.CatalogItem)
                .WithMany()
                .HasForeignKey(cl => cl.CatalogItemId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
