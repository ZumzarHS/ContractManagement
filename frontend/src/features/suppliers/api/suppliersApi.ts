import { apiGet } from "../../../lib/apiClient";
import type { SupplierDto } from "../types";

export function getSuppliers(): Promise<SupplierDto[]> {
    return apiGet<SupplierDto[]>("/suppliers");
}

export function getSupplierById(supplierId: string): Promise<SupplierDto> {
    return apiGet<SupplierDto>(`/suppliers/${supplierId}`);
}
