using ContractManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class ContractHistoryConfiguration : IEntityTypeConfiguration<ContractHistory>
    {
        public void Configure(EntityTypeBuilder<ContractHistory> builder)
        {
            builder.HasKey(ch => ch.ContractHistoryId);

            builder.Property(ch => ch.Description)
                .HasMaxLength(1000);

            // ContractHistory -> Employee
            builder.HasOne(ch => ch.Employee)
                .WithMany()
                .HasForeignKey(ch => ch.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);

            // ContractHistory -> Contract
            builder.HasOne(ch => ch.Contract)
               .WithMany()
               .HasForeignKey(ch => ch.ContractId)
               .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
