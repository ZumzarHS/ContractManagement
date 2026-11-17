import { useContext } from "react";
import { EmployeeContext } from "../../../app/providers/EmployeeContext";

export function useEmployee() {
    const context = useContext(EmployeeContext);

    if (!context) {
        throw new Error(
            "useEmployee must be used within an EmployeeProvider"
        );
    }

    return context;
}