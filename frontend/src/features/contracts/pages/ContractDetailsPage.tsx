import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { getContractById } from "../api/contractsApi";
import ContractLinesTable from "../components/ContractLinesTable";
import type { ContractDto } from "../types";
import { formatNoticePeriod, getContractStatusLabel, getActionStatusLabel } from "../contractStatus";
import Detail from "../../../components/Detail";

function ContractDetailsPage() {
    const { contractId } = useParams<{ contractId: string }>();
    const navigate = useNavigate();
    const [contract, setContract] = useState<ContractDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!contractId) {
            return;
        }

        const id = contractId;

        async function loadContract() {
            try {
                const data = await getContractById(id);
                setContract(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred while fetching the contract.");
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadContract();
    }, [contractId]);

    if (!contractId) {
        return <div>Error: Contract ID is missing.</div>;
    }

    if (isLoading) {
        return <div>Loading contract...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!contract) {
        return <div>Contract was not found.</div>;
    }

    return (
        <div>
            <Stack
                direction="row"
                sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }}
            >
                <Typography variant="h4">{contract.title}</Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate(`/contracts/${contract.contractId}/edit`)}
                >
                    Edit Contract
                </Button>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mb: 3, alignItems: "center", color: "text.secondary" }}>
                <Typography variant="caption">
                    Last activity by:
                </Typography>

                <Typography variant="caption" sx={{ color: "text.primary", fontWeight: 600 }}>
                    {contract.lastHandledBy ?? "Unknown"}
                </Typography>

                <Typography variant="caption">
                    {`at ${contract.lastHandledAt
                        ? new Date(contract.lastHandledAt).toLocaleString("da-DK")
                        : "Unknown date"}`}
                </Typography>
            </Stack>

            <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Detail label="Contract ID" value={contract.contractId} />
                    <Detail label="Description" value={contract.description} />
                    <Detail label="Start date" value={contract.startDate} />
                    <Detail label="End date" value={contract.endDate} />
                    <Detail label="Action date" value={contract.actionDate} />
                    <Detail
                        label="Notice period"
                        value={formatNoticePeriod(
                            contract.noticePeriodValue,
                            contract.noticePeriodUnit,
                        )}
                    />
                    <Detail
                        label="Contract status"
                        value={getContractStatusLabel(contract.contractStatus)}
                    />
                    <Detail
                        label="Action status"
                        value={getActionStatusLabel(contract.actionStatus)}
                    />
                    <Detail label="Supplier Name" value={contract.supplierName} />
                </Stack>
            </Paper>

            <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                Contract lines
            </Typography>

            <ContractLinesTable contractLines={contract.contractLines} />
        </div>
    );
}

export default ContractDetailsPage;