import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createCatalogItem } from "../api/catalogItemsApi";
import type { CreateCatalogItemRequest } from "../types";

function CreateCatalogItemPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateCatalogItemRequest>({
        name: "",
        description: null,
        type: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleChange(
        field: keyof CreateCatalogItemRequest,
        value: string | number,
    ) {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const catalogItemId = await createCatalogItem({
                ...formData,
                name: formData.name.trim(),
                description: formData.description?.trim() || null,
            });

            navigate(`/catalogitems/${catalogItemId}`);
        } catch {
            setError("Catalog item kunne ikke oprettes. Prøv igen.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Box sx={{ maxWidth: 800 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
                Create Catalog Item
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
                Add a new catalog item to your system.
            </Typography>

            <Paper elevation={0} sx={{ p: 4, border: "1px solid #e0e4e8" }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {error && <Alert severity="error">{error}</Alert>}

                        <TextField
                            label="Name"
                            value={formData.name}
                            onChange={(event) => handleChange("name", event.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            select
                            label="Type"
                            value={formData.type}
                            onChange={(event) =>
                                handleChange("type", Number(event.target.value))
                            }
                            required
                            fullWidth
                        >
                            <MenuItem value={0}>Product</MenuItem>
                            <MenuItem value={1}>Service</MenuItem>
                        </TextField>

                        <TextField
                            label="Description"
                            value={formData.description ?? ""}
                            onChange={(event) =>
                                handleChange("description", event.target.value)
                            }
                            multiline
                            minRows={3}
                            fullWidth
                        />

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ justifyContent: "flex-end" }}
                        >
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/catalogitems")}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creating..." : "Create Catalog Item"}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default CreateCatalogItemPage;
