import { apiGet } from "../../../lib/apiClient";
import type { ContractDto } from "../types";

export function getContracts(): Promise<ContractDto[]> {
    return apiGet<ContractDto[]>("/contracts");
}

export function getContractById(contractId: string): Promise<ContractDto> {
    return apiGet<ContractDto>(`/contracts/${contractId}`);
}