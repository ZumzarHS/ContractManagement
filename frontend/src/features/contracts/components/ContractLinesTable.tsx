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
import type { ContractLineDto } from "../types";

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

export default ContractLinesTable;