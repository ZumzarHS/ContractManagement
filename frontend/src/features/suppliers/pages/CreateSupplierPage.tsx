
import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createSupplier } from "../api/suppliersApi";
import type { CreateSupplierRequest } from "../types";

function CreateSupplierPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CreateSupplierRequest>({
        name: "",
        address: "",
        cvr: "",
        contactPerson: null,
        email: null,
        phoneNumber: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleChange(field: keyof CreateSupplierRequest, value: string) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const supplierId = await createSupplier({
                ...formData,
                name: formData.name.trim(),
                address: formData.address.trim(),
                cvr: formData.cvr.trim(),
                contactPerson: formData.contactPerson?.trim() || null,
                email: formData.email?.trim() || null,
                phoneNumber: formData.phoneNumber?.trim() || null,
            });

            navigate(`/suppliers/${supplierId}`);
        } catch {
            setError("Supplier kunne ikke oprettes. Prøv igen.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Box sx={{ maxWidth: 800 }}>
            <Typography
                variant="h4"
                sx={{ fontWeight: 600 }}
                gutterBottom
            >
                Create Supplier
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
                Add a new supplier to your system.
            </Typography>

            <Paper elevation={0} sx={{ p: 4, border: "1px solid #e0e4e8" }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {error && <Alert severity="error">{error}</Alert>}

                        <TextField
                            label="Name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Address"
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            label="CVR"
                            value={formData.cvr}
                            onChange={(e) => handleChange("cvr", e.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Contact person"
                            value={formData.contactPerson ?? ""}
                            onChange={(e) => handleChange("contactPerson", e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Email"
                            type="email"
                            value={formData.email ?? ""}
                            onChange={(e) => handleChange("email", e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Phone number"
                            value={formData.phoneNumber ?? ""}
                            onChange={(e) => handleChange("phoneNumber", e.target.value)}
                            fullWidth
                        />

                        <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/suppliers")}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creating..." : "Create Supplier"}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default CreateSupplierPage;
