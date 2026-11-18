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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { createCatalogItem } from "../../catalogItems/api/catalogItemsApi";
import type { CatalogItemDto, CreateCatalogItemRequest } from "../../catalogItems/types";
import type { CreateContractLineRequest } from "../types";

export default function ContractLineForm({ line, index, catalogItems, onChange, onRemove, onCatalogItemCreated }: {
    line: CreateContractLineRequest;
    index: number;
    catalogItems: CatalogItemDto[];
    onChange: (index: number, field: keyof CreateContractLineRequest, value: string | number | null) => void;
    onRemove: () => void;
    onCatalogItemCreated: (item: CatalogItemDto) => void;
}) {
    const [isCreatingCatalogItem, setIsCreatingCatalogItem] = useState(false);
    const [isSubmittingCatalogItem, setIsSubmittingCatalogItem] = useState(false);
    const [newItem, setNewItem] = useState<CreateCatalogItemRequest>({ name: "", description: null, type: 0 });
    const [error, setError] = useState<string | null>(null);

    async function handleCreateCatalogItem() {
        setError(null);
        setIsSubmittingCatalogItem(true);
        try {
            const request = { ...newItem, name: newItem.name.trim(), description: newItem.description?.trim() || null };
            const id = await createCatalogItem(request);
            onCatalogItemCreated({ ...request, catalogItemId: id });
            setNewItem({ name: "", description: null, type: 0 });
            setIsCreatingCatalogItem(false);
        } catch {
            setError("Catalog item kunne ikke oprettes.");
        } finally {
            setIsSubmittingCatalogItem(false);
        }
    }

    return (
        <Paper elevation={0} sx={{ p: 4, border: "1px solid #e0e4e8" }}>
            <Stack spacing={3}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6">Line {index + 1}</Typography>
                    <Button color="error" startIcon={<DeleteOutlineIcon />} onClick={onRemove}>Remove</Button>
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                        select
                        label="Catalog item"
                        value={line.catalogItemId}
                        onChange={(e) => onChange(index, "catalogItemId", e.target.value)}
                        required
                        fullWidth
                    >
                        {catalogItems.map((item) => (
                            <MenuItem key={item.catalogItemId} value={item.catalogItemId}>
                                {item.name} ({item.type === 0 ? "Product" : "Service"})
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="outlined" onClick={() => setIsCreatingCatalogItem((previous) => !previous)} sx={{ minWidth: 190 }}>
                        {isCreatingCatalogItem ? "Cancel new item" : "New catalog item"}
                    </Button>
                </Stack>
                {isCreatingCatalogItem && (
                    <Box sx={{ p: 2, bgcolor: "#f5f7fa" }}>
                        <Stack spacing={2}>
                            {error && <Alert severity="error">{error}</Alert>}
                            <TextField label="Name" value={newItem.name} onChange={(e) => setNewItem((p) => ({ ...p, name: e.target.value }))} required fullWidth />
                            <TextField select label="Type" value={newItem.type} onChange={(e) => setNewItem((p) => ({ ...p, type: Number(e.target.value) }))} fullWidth>
                                <MenuItem value={0}>Product</MenuItem>
                                <MenuItem value={1}>Service</MenuItem>
                            </TextField>
                            <TextField label="Description" value={newItem.description ?? ""} onChange={(e) => setNewItem((p) => ({ ...p, description: e.target.value }))} multiline minRows={2} fullWidth />
                            <Button
                                type="button"
                                variant="contained"
                                disabled={!newItem.name.trim() || isSubmittingCatalogItem}
                                onClick={handleCreateCatalogItem}
                            >
                                {isSubmittingCatalogItem ? "Creating..." : "Create and select"}
                            </Button>
                        </Stack>
                    </Box>
                )}
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField label="Producer" value={line.producer ?? ""} onChange={(e) => onChange(index, "producer", e.target.value)} fullWidth />
                    <TextField label="Model" value={line.model ?? ""} onChange={(e) => onChange(index, "model", e.target.value)} fullWidth />
                    <TextField label="Price" type="number" value={line.price} onChange={(e) => onChange(index, "price", Number(e.target.value))} slotProps={{ htmlInput: { min: 0, step: "0.01" } }} required fullWidth />
                    <TextField label="Quantity" type="number" value={line.quantity ?? ""} onChange={(e) => onChange(index, "quantity", e.target.value === "" ? null : Number(e.target.value))} slotProps={{ htmlInput: { min: 1 } }} fullWidth />
                </Stack>
                <TextField label="Line description" value={line.description ?? ""} onChange={(e) => onChange(index, "description", e.target.value)} multiline minRows={2} fullWidth />
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField label="Initial amount" type="number" value={line.initialAmount ?? ""} onChange={(e) => onChange(index, "initialAmount", e.target.value === "" ? null : Number(e.target.value))} slotProps={{ htmlInput: { min: 0, step: "0.01" } }} fullWidth />
                    <TextField label="Delivery interval" type="number" value={line.deliveryFrequencyInterval ?? ""} onChange={(e) => onChange(index, "deliveryFrequencyInterval", e.target.value === "" ? null : Number(e.target.value))} slotProps={{ htmlInput: { min: 1 } }} fullWidth />
                    <FrequencySelect label="Delivery unit" value={line.deliveryFrequencyUnit} onChange={(value) => onChange(index, "deliveryFrequencyUnit", value)} allowEmpty />
                    <TextField label="Payment interval" type="number" value={line.paymentFrequencyInterval} onChange={(e) => onChange(index, "paymentFrequencyInterval", Number(e.target.value))} slotProps={{ htmlInput: { min: 1 } }} required fullWidth />
                    <FrequencySelect label="Payment unit" value={line.paymentFrequencyUnit} onChange={(value) => onChange(index, "paymentFrequencyUnit", value ?? 0)} />
                </Stack>
            </Stack>
        </Paper>
    );
}

function FrequencySelect({ label, value, onChange, allowEmpty }: { label: string; value: number | null; onChange: (value: number | null) => void; allowEmpty?: boolean }) {
    return (
        <TextField select label={label} value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))} required={!allowEmpty} fullWidth>
            {allowEmpty && <MenuItem value="">None</MenuItem>}
            <MenuItem value={0}>Days</MenuItem>
            <MenuItem value={1}>Weeks</MenuItem>
            <MenuItem value={2}>Months</MenuItem>
            <MenuItem value={3}>Years</MenuItem>
        </TextField>
    );
}