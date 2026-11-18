import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getSuppliers } from "../api/suppliersApi";
import type { SupplierDto } from "../types";
import SuppliersTable from "../components/SuppliersTable";

function SuppliersPage() {
    const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
            }}>
                <Typography variant="h4">
                    Suppliers
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/suppliers/new")}
                >
                    Create Supplier
                </Button>
            </Box>

            <SuppliersTable suppliers={suppliers} />
        </div>
    );
}

export default SuppliersPage;
