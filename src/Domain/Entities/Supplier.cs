using ContractManagement.Domain.Enums;

namespace ContractManagement.Domain.Entities;
public class Supplier
{
    public Guid SupplierId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Cvr { get; set; } = string.Empty;
    public string? ContactPerson { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }

    public SupplierStatus Status { get; set; } = SupplierStatus.Active;

    private Supplier() { } // EF Core constructor

    public static Supplier Create(
        string name,
        string address,
        string cvr,
        string? contactPerson,
        string? email,
        string? phoneNumber)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name is required.");
        if (string.IsNullOrWhiteSpace(address))
            throw new ArgumentException("Address is required.");
        if (string.IsNullOrWhiteSpace(cvr))
            throw new ArgumentException("CVR is required.");
        var supplier = new Supplier
        {
            SupplierId = Guid.NewGuid(),
            Name = name,
            Address = address,
            Cvr = cvr,
            ContactPerson = contactPerson,
            Email = email,
            PhoneNumber = phoneNumber
        };
        return supplier;
    }
}
    

