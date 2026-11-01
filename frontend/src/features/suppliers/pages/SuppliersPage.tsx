import { useEffect, useState } from "react";
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
import { getSuppliers } from "../api/suppliersApi";
import { getSupplierStatusLabel } from "../supplierStatus";
import type { SupplierDto } from "../types";

function SuppliersPage() {
    const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadSuppliers() {
            try {
                const data = await getSuppliers();
                setSuppliers(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred while fetching suppliers.");
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadSuppliers();
    }, []);

    if (isLoading) {
        return <div>Loading suppliers...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Suppliers
            </Typography>

            <SuppliersTable suppliers={suppliers} />
        </div>
    );
}

function SuppliersTable({ suppliers }: { suppliers: SupplierDto[] }) {
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

export default SuppliersPage;
