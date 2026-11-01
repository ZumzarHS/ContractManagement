export type SupplierStatus = 0 | 1;

export function getSupplierStatusLabel(status: SupplierStatus): string {
    switch (status) {
        case 0:
            return "Active";
        case 1:
            return "Inactive";
        default:
            return "Unknown";
    }
}