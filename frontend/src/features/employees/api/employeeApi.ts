import { apiGet } from "../../../lib/apiClient";
import type { EmployeeListDto } from "../types";

export function getEmployees(): Promise<EmployeeListDto[]> {
    return apiGet<EmployeeListDto[]>("/employees");
}