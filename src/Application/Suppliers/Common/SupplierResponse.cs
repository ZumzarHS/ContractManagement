using ContractManagement.Domain.Enums;

namespace Application.Suppliers.Common
{
    public sealed record SupplierResponse (
        Guid SupplierId,
        string Name,
        string Address,
        string Cvr,
        string? ContactPerson,
        string? Email,
        string? PhoneNumber,
        SupplierStatus Status
    );
}
