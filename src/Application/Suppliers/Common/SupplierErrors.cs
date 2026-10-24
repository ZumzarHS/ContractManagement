using Application.Common.Results;

namespace Application.Suppliers.Common;

public static class SupplierErrors
{
    public static Error NotFound(Guid supplierId) =>
        new(
            "Suppliers.NotFound",
            $"Supplier with ID '{supplierId}' was not found.",
            ErrorType.NotFound);
}