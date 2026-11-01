
import { useEffect, useState } from "react";
import type { ContractDto } from "../types";
import { getContracts } from "../api/contractsApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ContractsPage() {
    const navigate = useNavigate();
    const [contracts, setContracts] = useState<ContractDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
            <Stack
                direction="row"
                sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }}
            >
                <Typography variant="h4">Contracts</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/contracts/new")}
                >
                    Create Contract
                </Button>
            </Stack>

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
                                <Link
                                    to={`/contracts/${contract.contractId}`}
                                    style={{
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}
                                >
                                    <Typography sx={{ fontWeight: "medium" }}>
                                        {contract.title}
                                    </Typography>
                                </Link>
                            </TableCell>

                            <TableCell>{contract.startDate}</TableCell>

                            <TableCell>
                                {contract.endDate ?? "No end date"}
                            </TableCell>

                            <TableCell>{contract.supplierName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ContractsPage;
