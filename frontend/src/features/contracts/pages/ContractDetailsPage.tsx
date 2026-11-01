import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { getContractById } from "../api/contractsApi";
import type { ContractDto, ContractLineDto } from "../types";
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

            <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                Contract lines
            </Typography>

            <ContractLinesTable contractLines={contract.contractLines} />
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

function ContractLinesTable({ contractLines }: { contractLines: ContractLineDto[] }) {
    if (contractLines.length === 0) {
        return (
            <Typography color="text.secondary">
                This contract has no contract lines.
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Catalog item</TableCell>
                        <TableCell>Producer</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Initial amount</TableCell>
                        <TableCell>Delivery frequency</TableCell>
                        <TableCell>Payment frequency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contractLines.map((line) => (
                        <TableRow key={line.contractLineId} hover>
                            <TableCell>{line.catalogItemName}</TableCell>
                            <TableCell>{line.producer ?? "—"}</TableCell>
                            <TableCell>{line.model ?? "—"}</TableCell>
                            <TableCell>{line.description ?? "—"}</TableCell>
                            <TableCell>{formatAmount(line.price)}</TableCell>
                            <TableCell>{line.quantity ?? "—"}</TableCell>
                            <TableCell>
                                {line.initialAmount === null
                                    ? "—"
                                    : formatAmount(line.initialAmount)}
                            </TableCell>
                            <TableCell>
                                {formatFrequency(
                                    line.deliveryFrequencyInterval,
                                    line.deliveryFrequencyUnit,
                                )}
                            </TableCell>
                            <TableCell>
                                {formatFrequency(
                                    line.paymentFrequencyInterval,
                                    line.paymentFrequencyUnit,
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function formatAmount(amount: number): string {
    return new Intl.NumberFormat("da-DK", {
        style: "currency",
        currency: "DKK",
    }).format(amount);
}

function formatFrequency(interval: number | null, unit: number | null): string {
    if (interval === null || unit === null) {
        return "—";
    }

    const units = ["day(s)", "week(s)", "month(s)", "year(s)"];
    return `${interval} ${units[unit] ?? "period(s)"}`;
}

export default ContractDetailsPage;