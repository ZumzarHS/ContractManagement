import { Link } from "react-router-dom";
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
import type { ContractListDto } from "../types";

interface ContractsTableProps {
    contracts: ContractListDto[];
}

export default function ContractsTable({ contracts }: ContractsTableProps) {
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