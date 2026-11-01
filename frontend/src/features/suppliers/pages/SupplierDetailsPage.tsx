import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Stack, Typography } from "@mui/material";
import { getSupplierById } from "../api/suppliersApi";
import { getSupplierStatusLabel } from "../supplierStatus";
import type { SupplierDto } from "../types";

function SupplierDetailsPage() {
    const { supplierId } = useParams<{ supplierId: string }>();
    const [supplier, setSupplier] = useState<SupplierDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!supplierId) {
            return;
        }

        const id = supplierId;

        async function loadSupplier() {
            try {
                const data = await getSupplierById(id);
                setSupplier(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred while fetching the supplier.");
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadSupplier();
    }, [supplierId]);

    if (!supplierId) {
        return <div>Error: Supplier ID is missing.</div>;
    }

    if (isLoading) {
        return <div>Loading supplier...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!supplier) {
        return <div>Supplier was not found.</div>;
    }

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {supplier.name}
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Detail label="CVR" value={supplier.cvr} />
                    <Detail label="Address" value={supplier.address} />
                    <Detail label="Contact person" value={supplier.contactPerson} />
                    <Detail label="Email" value={supplier.email} />
                    <Detail label="Phone" value={supplier.phoneNumber} />
                    <Detail
                        label="Status"
                        value={getSupplierStatusLabel(supplier.status)}
                    />
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

export default SupplierDetailsPage;
