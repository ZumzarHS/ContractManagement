import { useEffect, useState } from "react";
import type { ContractDto } from "../types";
import { getContracts } from "../api/contractsApi";

function ContractsPage() {
    const [contracts, setContracts] = useState<ContractDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadContracts() {
            try {
                const data = await getContracts();
                setContracts(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred while fetching contracts.");
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadContracts();
    }, []);

    if (isLoading) {
        return <div>Loading contracts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div>
            <h1>Contracts</h1>

            {contracts.map((contract) => (
                <div key={contract.contractId}>
                    <h2>{contract.title}</h2>
                    <p>{contract.description}</p>
                    <p>Start date: {contract.startDate}</p>
                    <p>End date: {contract.endDate ?? "No end date"}</p>
                </div>
            ))}
        </div>
    );
}

export default ContractsPage;