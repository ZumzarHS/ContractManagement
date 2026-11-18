import { useEffect, useState } from "react";
import type { ContractListDto } from "../types";
import { getContracts } from "../api/contractsApi";
import { useNavigate } from "react-router-dom";
import ContractsTable from "../components/ContractsTable";
import {
    Button,
    Stack,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ContractsPage() {
    const navigate = useNavigate();
    const [contracts, setContracts] = useState<ContractListDto[]>([]);
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

export default ContractsPage;
