using Application.Common.Results;
using Application.Interfaces;
using ContractManagement.Domain.Entities;

namespace Application.Suppliers.CreateSupplier;

public class CreateSupplierCommandHandler
{
    private readonly ISupplierRepository _suppliers;

    public CreateSupplierCommandHandler(ISupplierRepository suppliers)
    {
        _suppliers = suppliers;
    }

    public async Task<Result<Guid>> Handle(
        CreateSupplierCommand command,
        CancellationToken ct)
    {
        var supplier = Supplier.Create(
            command.Name,
            command.Address,
            command.Cvr,
            command.ContactPerson,
            command.Email,
            command.PhoneNumber);

        await _suppliers.AddAsync(supplier, ct);

        return Result<Guid>.Success(supplier.SupplierId);
    }
}