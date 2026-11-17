import { createContext } from "react";
import type { EmployeeListDto } from "../../features/employees/types";

interface EmployeeContextType {
    employees: EmployeeListDto[];
    selectedEmployee: EmployeeListDto | null;
    setSelectedEmployee: (employee: EmployeeListDto) => void;
    isLoading: boolean;
}

export const EmployeeContext = createContext<EmployeeContextType | undefined>(
    undefined
);