import { apiGet, apiPost, apiPut } from "../../../lib/apiClient";
import type {
    ContractDto,
    CreateContractRequest,
    UpdateContractRequest,
} from "../types";

export function getContracts(): Promise<ContractDto[]> {
    return apiGet<ContractDto[]>("/contracts");
}

export function getContractById(contractId: string): Promise<ContractDto> {
    return apiGet<ContractDto>(`/contracts/${contractId}`);
}

export function createContract(contract: CreateContractRequest): Promise<string> {
    return apiPost<CreateContractRequest, string>("/contracts", contract);
}

export function updateContractById(contractId: string,contract: UpdateContractRequest,): Promise<void> {
    return apiPut<UpdateContractRequest>(`/contracts/${contractId}`, contract);
}