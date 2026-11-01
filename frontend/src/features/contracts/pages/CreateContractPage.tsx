import { useEffect, useState, type FormEvent } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { createCatalogItem, getCatalogItems } from "../../catalogItems/api/catalogItemsApi";
import type { CatalogItemDto, CreateCatalogItemRequest } from "../../catalogItems/types";
import { getSuppliers } from "../../suppliers/api/suppliersApi";
import type { SupplierDto } from "../../suppliers/types";
import { createContract } from "../api/contractsApi";
import type { CreateContractLineRequest, CreateContractRequest } from "../types";

const emptyLine: CreateContractLineRequest = {
    catalogItemId: "",
    producer: null,
    model: null,
    price: 0,
    quantity: null,
    description: null,
    initialAmount: null,
    deliveryFrequencyInterval: null,
    deliveryFrequencyUnit: null,
    paymentFrequencyInterval: 1,
    paymentFrequencyUnit: 2,
};

function CreateContractPage() {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);
    const [catalogItems, setCatalogItems] = useState<CatalogItemDto[]>([]);
    const [formData, setFormData] = useState<CreateContractRequest>({
        supplierId: "",
        title: "",
        description: null,
        startDate: "",
        endDate: null,
        actionDate: null,
        noticePeriodValue: null,
        noticePeriodUnit: null,
        contractLines: [],
    });
    const [isLoadingOptions, setIsLoadingOptions] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadOptions() {
            try {
                const [supplierData, catalogItemData] = await Promise.all([
                    getSuppliers(),
                    getCatalogItems(),
                ]);
                setSuppliers(supplierData);
                setCatalogItems(catalogItemData);
            } catch (loadError: unknown) {
                setError(
                    loadError instanceof Error
                        ? loadError.message
                        : "Suppliers and catalog items could not be loaded.",
                );
            } finally {
                setIsLoadingOptions(false);
            }
        }

        loadOptions();
    }, []);

    function updateContract(
        field: keyof CreateContractRequest,
        value: string | number | null,
    ) {
        setFormData((previous) => ({ ...previous, [field]: value }));
    }

    function updateLine(
        index: number,
        field: keyof CreateContractLineRequest,
        value: string | number | null,
    ) {
        setFormData((previous) => ({
            ...previous,
            contractLines: previous.contractLines.map((line, lineIndex) =>
                lineIndex === index ? { ...line, [field]: value } : line,
            ),
        }));
    }

    function addLine() {
        setFormData((previous) => ({
            ...previous,
            contractLines: [...previous.contractLines, { ...emptyLine }],
        }));
    }

    function removeLine(index: number) {
        setFormData((previous) => ({
            ...previous,
            contractLines: previous.contractLines.filter((_, i) => i !== index),
        }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const contractId = await createContract({
                ...formData,
                title: formData.title.trim(),
                description: formData.description?.trim() || null,
                contractLines: formData.contractLines.map((line) => ({
                    ...line,
                    producer: line.producer?.trim() || null,
                    model: line.model?.trim() || null,
                    description: line.description?.trim() || null,
                })),
            });
            navigate(`/contracts/${contractId}`);
        } catch {
            setError("Contract kunne ikke oprettes. Kontroller felterne og prøv igen.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoadingOptions) {
        return <div>Loading suppliers and catalog items...</div>;
    }

    return (
        <Box sx={{ maxWidth: 1100 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
                Create Contract
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Paper elevation={0} sx={{ p: 4, border: "1px solid #e0e4e8" }}>
                        <Stack spacing={3}>
                            <Typography variant="h6">Contract details</Typography>
                            <TextField
                                select
                                label="Supplier"
                                value={formData.supplierId}
                                onChange={(e) => updateContract("supplierId", e.target.value)}
                                required
                                fullWidth
                            >
                                {suppliers.map((supplier) => (
                                    <MenuItem key={supplier.supplierId} value={supplier.supplierId}>
                                        {supplier.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Title"
                                value={formData.title}
                                onChange={(e) => updateContract("title", e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                value={formData.description ?? ""}
                                onChange={(e) => updateContract("description", e.target.value)}
                                multiline
                                minRows={3}
                                fullWidth
                            />
                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <DateField label="Start date" value={formData.startDate} required onChange={(value) => updateContract("startDate", value)} />
                                <DateField label="End date" value={formData.endDate} onChange={(value) => updateContract("endDate", value || null)} />
                                <DateField label="Action date" value={formData.actionDate} onChange={(value) => updateContract("actionDate", value || null)} />
                            </Stack>
                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    label="Notice period"
                                    type="number"
                                    value={formData.noticePeriodValue ?? ""}
                                    onChange={(e) => updateContract("noticePeriodValue", e.target.value === "" ? null : Number(e.target.value))}
                                    slotProps={{ htmlInput: { min: 0 } }}
                                    fullWidth
                                />
                                <TextField
                                    select
                                    label="Notice period unit"
                                    value={formData.noticePeriodUnit ?? ""}
                                    onChange={(e) => updateContract("noticePeriodUnit", e.target.value === "" ? null : Number(e.target.value))}
                                    fullWidth
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value={0}>Days</MenuItem>
                                    <MenuItem value={1}>Months</MenuItem>
                                    <MenuItem value={2}>Years</MenuItem>
                                </TextField>
                            </Stack>
                        </Stack>
                    </Paper>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h5">Contract lines</Typography>
                        <Button startIcon={<AddIcon />} onClick={addLine}>Add line</Button>
                    </Stack>
                    {formData.contractLines.map((line, index) => (
                        <ContractLineForm
                            key={index}
                            line={line}
                            index={index}
                            catalogItems={catalogItems}
                            onChange={updateLine}
                            onRemove={() => removeLine(index)}
                            onCatalogItemCreated={(item) => {
                                setCatalogItems((previous) => [...previous, item]);
                                updateLine(index, "catalogItemId", item.catalogItemId);
                            }}
                        />
                    ))}
                    {formData.contractLines.length === 0 && (
                        <Typography color="text.secondary">No contract lines added yet.</Typography>
                    )}
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
                        <Button variant="outlined" onClick={() => navigate("/contracts")} disabled={isSubmitting}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Contract"}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}

function DateField({ label, value, required, onChange }: { label: string; value: string | null; required?: boolean; onChange: (value: string) => void }) {
    return (
        <TextField
            label={label}
            type="date"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            required={required}
            fullWidth
        />
    );
}

function ContractLineForm({ line, index, catalogItems, onChange, onRemove, onCatalogItemCreated }: {
    line: CreateContractLineRequest;
    index: number;
    catalogItems: CatalogItemDto[];
    onChange: (index: number, field: keyof CreateContractLineRequest, value: string | number | null) => void;
    onRemove: () => void;
    onCatalogItemCreated: (item: CatalogItemDto) => void;
}) {
    const [isCreatingCatalogItem, setIsCreatingCatalogItem] = useState(false);
    const [newItem, setNewItem] = useState<CreateCatalogItemRequest>({ name: "", description: null, type: 0 });
    const [error, setError] = useState<string | null>(null);

    async function handleCreateCatalogItem(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        try {
            const request = { ...newItem, name: newItem.name.trim(), description: newItem.description?.trim() || null };
            const id = await createCatalogItem(request);
            onCatalogItemCreated({ ...request, catalogItemId: id });
            setNewItem({ name: "", description: null, type: 0 });
            setIsCreatingCatalogItem(false);
        } catch {
            setError("Catalog item kunne ikke oprettes.");
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
                    <Box component="form" onSubmit={handleCreateCatalogItem} sx={{ p: 2, bgcolor: "#f5f7fa" }}>
                        <Stack spacing={2}>
                            {error && <Alert severity="error">{error}</Alert>}
                            <TextField label="Name" value={newItem.name} onChange={(e) => setNewItem((p) => ({ ...p, name: e.target.value }))} required fullWidth />
                            <TextField select label="Type" value={newItem.type} onChange={(e) => setNewItem((p) => ({ ...p, type: Number(e.target.value) }))} fullWidth>
                                <MenuItem value={0}>Product</MenuItem>
                                <MenuItem value={1}>Service</MenuItem>
                            </TextField>
                            <TextField label="Description" value={newItem.description ?? ""} onChange={(e) => setNewItem((p) => ({ ...p, description: e.target.value }))} multiline minRows={2} fullWidth />
                            <Button type="submit" variant="contained">Create and select</Button>
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

export default CreateContractPage;
