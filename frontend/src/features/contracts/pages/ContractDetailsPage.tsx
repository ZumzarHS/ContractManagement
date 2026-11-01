import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Stack, Typography } from "@mui/material";
import { getContractById } from "../api/contractsApi";
import type { ContractDto } from "../types";
import { formatNoticePeriod, getContractStatusLabel, getActionStatusLabel } from "../contractUtils";

function ContractDetailsPage() {
    const { contractId } = useParams<{ contractId: string }>();
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
            <Typography variant="h4" sx={{ mb: 3 }}>
                {contract.title}
            </Typography>

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
        </div>
    );
}

function Detail({ label, value }: { label: string; value?: string | null }) {
    return (
        <div>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            <Typography>{value ?? "—"}</Typography>
        </div>
    );
}

export default ContractDetailsPage;