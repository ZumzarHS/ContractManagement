
import { useEffect, useState } from "react";
import type { ContractDto } from "../types";
import { getContracts } from "../api/contractsApi";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

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
            <Typography variant="h4" sx={{ mb: 3 }}>
                Contracts
            </Typography>

            <ContractsTable contracts={contracts} />
        </div>
    );
}

function ContractsTable({ contracts }: {
    contracts: ContractDto[];
}) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Contract</TableCell>
                        <TableCell>Start date</TableCell>
                        <TableCell>End date</TableCell>
                        <TableCell>Supplier</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {contracts.map((contract) => (
                        <TableRow key={contract.contractId} hover>
                            <TableCell>
                                <Typography sx={{ fontWeight: "medium" }}>
                                    {contract.title}
                                </Typography>
                            </TableCell>
                            <TableCell>{contract.startDate}</TableCell>
                            <TableCell>
                                {contract.endDate ?? "No end date"}
                            </TableCell>
                            <TableCell>{contract.supplierId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ContractsPage;
