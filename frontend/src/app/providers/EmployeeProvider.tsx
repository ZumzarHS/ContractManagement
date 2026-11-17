import { useEffect, useState } from "react";
import { EmployeeContext } from "./EmployeeContext";
import { getEmployees } from "../../features/employees/api/employeeApi";
import type { EmployeeListDto } from "../../features/employees/types";

interface EmployeeProviderProps {
    children: React.ReactNode;
}

export function EmployeeProvider({ children }: EmployeeProviderProps) {
    const [employees, setEmployees] = useState<EmployeeListDto[]>([]);
    const [selectedEmployee, setSelectedEmployee] =
        useState<EmployeeListDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadEmployees() {
            try {
                const data = await getEmployees();

                setEmployees(data);
                setSelectedEmployee(data[0] ?? null);
            } catch (error) {
                console.error("Failed to load employees:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadEmployees();
    }, []);

    return (
        <EmployeeContext.Provider
            value={{
                employees,
                selectedEmployee,
                setSelectedEmployee,
                isLoading,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
}