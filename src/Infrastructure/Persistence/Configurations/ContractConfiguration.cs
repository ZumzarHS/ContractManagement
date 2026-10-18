
using ContractManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class ContractConfiguration : IEntityTypeConfiguration<Contract>
{
    public void Configure(EntityTypeBuilder<Contract> builder)
    {
        builder.HasKey(c => c.ContractId);

        builder.Property(c => c.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(c => c.Description)
            .HasMaxLength(2000);

        // Contract -> Supplier
        builder.HasOne(c => c.Supplier)
            .WithMany()
            .HasForeignKey(c => c.SupplierId)
            .OnDelete(DeleteBehavior.Restrict);

        // Contract -> ContractLine
        builder.HasMany(c => c.ContractLines)
            .WithOne(cl => cl.Contract)
            .HasForeignKey(cl => cl.ContractId)
            .OnDelete(DeleteBehavior.Cascade);

        // Contract -> PreviousContract
        builder.HasOne(c => c.PreviousContract)
            .WithMany()
            .HasForeignKey(c => c.PreviousContractId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
