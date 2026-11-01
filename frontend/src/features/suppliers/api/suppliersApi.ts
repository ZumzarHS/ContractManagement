import { apiGet, apiPost } from "../../../lib/apiClient";
import type { SupplierDto, CreateSupplierRequest } from "../types";

export function getSuppliers(): Promise<SupplierDto[]> {
    return apiGet<SupplierDto[]>("/suppliers");
}

export function getSupplierById(supplierId: string): Promise<SupplierDto> {
    return apiGet<SupplierDto>(`/suppliers/${supplierId}`);
}

export async function createSupplier(
    supplier: CreateSupplierRequest
): Promise<string> {
    return apiPost<CreateSupplierRequest, string>("/suppliers", supplier);
}