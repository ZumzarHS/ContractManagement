using Application.Common.Results;
using Application.Interfaces;
using Application.Suppliers.Common;

namespace Application.Suppliers.GetSuppliers
{
    public sealed class GetSuppliersQueryHandler
    {
        private readonly ISupplierRepository _suppliers;

        public GetSuppliersQueryHandler(ISupplierRepository suppliers)
        {
            _suppliers = suppliers;
        }
        public async Task<Result<IReadOnlyList<SupplierResponse>>> Handle(
            GetSuppliersQuery query,
            CancellationToken ct)
        {
            var suppliers = await _suppliers.GetAllAsync(ct);

            var response = suppliers
                .Select(supplier => new SupplierResponse(
                    supplier.SupplierId,
                    supplier.Name,
                    supplier.Address,
                    supplier.Cvr,
                    supplier.ContactPerson,
                    supplier.Email,
                    supplier.PhoneNumber,
                    supplier.Status
                ))
                .ToList();

            return Result<IReadOnlyList<SupplierResponse>>.Success(response);
        }
    }
}
