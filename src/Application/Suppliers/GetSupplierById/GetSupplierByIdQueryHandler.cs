using Application.Common.Results;
using Application.Interfaces;
using Application.Suppliers.Common;

namespace Application.Suppliers.GetSupplierById;
    public class GetSupplierByIdQueryHandler
    {
        private readonly ISupplierRepository _suppliers;

        public GetSupplierByIdQueryHandler(ISupplierRepository suppliers)
        {
            _suppliers = suppliers;
        }

        public async Task<Result<SupplierResponse>> Handle(
            GetSupplierByIdQuery query,
            CancellationToken ct)
        {
            var supplier = await _suppliers.GetByIdAsync(query.SupplierId, ct);

            if (supplier is null)
            {
                return Result<SupplierResponse>.Failure(
                    SupplierErrors.NotFound(query.SupplierId));
            }

            var response = new SupplierResponse(
                supplier.SupplierId,
                supplier.Name,
                supplier.Address,
                supplier.Cvr,
                supplier.ContactPerson,
                supplier.Email,
                supplier.PhoneNumber,
                supplier.Status
            );

            return Result<SupplierResponse>.Success(response);
        }
    }
