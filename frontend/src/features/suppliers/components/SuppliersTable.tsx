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
import { getSupplierStatusLabel } from "../supplierStatus";
import type { SupplierDto } from "../types";

export default function SuppliersTable({ suppliers }: { suppliers: SupplierDto[] }) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Supplier</TableCell>
                        <TableCell>CVR</TableCell>
                        <TableCell>Contact person</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {suppliers.map((supplier) => (
                        <TableRow key={supplier.supplierId} hover>
                            <TableCell>
                                <Link
                                    to={`/suppliers/${supplier.supplierId}`}
                                    style={{
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}
                                >
                                    <Typography sx={{ fontWeight: "medium" }}>
                                        {supplier.name}
                                    </Typography>
                                </Link>
                            </TableCell>
                            <TableCell>{supplier.cvr}</TableCell>
                            <TableCell>{supplier.contactPerson ?? "—"}</TableCell>
                            <TableCell>{supplier.email ?? "—"}</TableCell>
                            <TableCell>{supplier.phoneNumber ?? "—"}</TableCell>
                            <TableCell>{getSupplierStatusLabel(supplier.status)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}