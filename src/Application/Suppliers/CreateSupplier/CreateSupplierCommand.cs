namespace Application.Suppliers.CreateSupplier;

public record CreateSupplierCommand(
    string Name,
    string Address,
    string Cvr,
    string? ContactPerson,
    string? Email,
    string? PhoneNumber
);