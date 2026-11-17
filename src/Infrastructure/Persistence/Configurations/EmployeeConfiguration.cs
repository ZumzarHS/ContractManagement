using ContractManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Persistence.Configurations
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasKey(e => e.EmployeeId);

            builder.Property(e => e.Name)
            .IsRequired()
            .HasMaxLength(100);

            builder.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(255);

            builder.HasIndex(e => e.Email)
                .IsUnique();

            builder.HasData(
                new
                {
                    EmployeeId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    Name = "Anders Andersen",
                    Email = "anders@example.com"
                },
                new
                {
                    EmployeeId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    Name = "Bo Hansen",
                    Email = "bo@example.com"
                },
                new
                {
                    EmployeeId = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                    Name = "Casper Nielsen",
                    Email = "casper@example.com"
                }
            );
        }

    }
}
