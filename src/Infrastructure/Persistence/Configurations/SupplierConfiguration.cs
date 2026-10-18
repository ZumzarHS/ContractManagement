using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ContractManagement.Domain.Entities;

namespace Infrastructure.Persistence.Configurations
{
    public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
    {
        public void Configure(EntityTypeBuilder<Supplier> builder)
        {
            builder.HasKey(s => s.SupplierId);

            builder.Property(s => s.Name)
           .IsRequired()
           .HasMaxLength(200);

            builder.Property(s => s.Address)
           .IsRequired()
           .HasMaxLength(500);

            builder.Property(s => s.Cvr)
           .IsRequired()
           .HasMaxLength(8);

            builder.HasIndex(s => s.Cvr).IsUnique();
        }
    }
}
