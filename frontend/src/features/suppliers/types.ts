import type { SupplierStatus } from "./supplierStatus";

export interface SupplierDto {
    supplierId: string;
    name: string;
    address: string;
    cvr: string;
    contactPerson: string | null;
    email: string | null;
    phoneNumber: string | null;
    status: SupplierStatus;
}

export interface CreateSupplierRequest {
    name: string;
    address: string;
    cvr: string;
    contactPerson: string | null;
    email: string | null;
    phoneNumber: string | null;
}