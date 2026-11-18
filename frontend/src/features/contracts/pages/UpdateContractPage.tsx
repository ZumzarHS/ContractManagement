import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getCatalogItems } from "../../catalogItems/api/catalogItemsApi";
import type { CatalogItemDto } from "../../catalogItems/types";
import { getSuppliers } from "../../suppliers/api/suppliersApi";
import type { SupplierDto } from "../../suppliers/types";
import { getContractById, updateContractById } from "../api/contractsApi";
import type {
    ContractDto,
    UpdateContractLineRequest,
    UpdateContractRequest,
} from "../types";
import { useEmployee } from "../../employees/hooks/useEmployee";

function UpdateContractPage() {
    const { contractId } = useParams<{ contractId: string }>();
    const navigate = useNavigate();
    const { selectedEmployee } = useEmployee();
    const [contract, setContract] = useState<ContractDto | null>(null);
    const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);
    const [catalogItems, setCatalogItems] = useState<CatalogItemDto[]>([]);
    const [formData, setFormData] = useState<UpdateContractRequest | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!contractId) {
            return;
        }

        const id = contractId;

        async function loadFormData() {
            try {
                const [contractData, supplierData, catalogItemData] = await Promise.all([
                    getContractById(id),
                    getSuppliers(),
                    getCatalogItems(),
                ]);
                setContract(contractData);
                setSuppliers(supplierData);
                setCatalogItems(catalogItemData);
                setFormData(toUpdateRequest(contractData));
            } catch (loadError: unknown) {
                setError(
                    loadError instanceof Error
                        ? loadError.message
                        : "Contract details could not be loaded.",
                );
            } finally {
                setIsLoading(false);
            }
        }

        loadFormData();
    }, [contractId]);

    function updateField(
        field: keyof UpdateContractRequest,
        value: string | number | null,
    ) {
        setFormData((previous) =>
            previous ? { ...previous, [field]: value } : previous,
        );
    }

    function updateLine(
        index: number,
        field: keyof UpdateContractLineRequest,
        value: string | number | null,
    ) {
        setFormData((previous) =>
            previous
                ? {
                      ...previous,
                      contractLines: previous.contractLines.map((line, lineIndex) =>
                          lineIndex === index ? { ...line, [field]: value } : line,
                      ),
                  }
                : previous,
        );
    }

    function addLine() {
        setFormData((previous) =>
            previous
                ? {
                      ...previous,
                      contractLines: [
                          ...previous.contractLines,
                          {
                              contractLineId: null,
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
                          },
                      ],
                  }
                : previous,
        );
    }

    function removeLine(index: number) {
        setFormData((previous) =>
            previous
                ? {
                      ...previous,
                      contractLines: previous.contractLines.filter(
                          (_, lineIndex) => lineIndex !== index,
                      ),
                  }
                : previous,
        );
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!contractId || !formData) {
            return;
        }

        if (!selectedEmployee) {
            setError("Select an active employee before updating the contract.");
            return;
        }

        setError(null);
        setIsSubmitting(true);

        try {
            await updateContractById(contractId, {
                ...formData,
                employeeId: selectedEmployee.employeeId,
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
        } catch (submitError: unknown) {
            setError(
                submitError instanceof Error
                    ? submitError.message
                    : "Contract could not be updated.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!contractId) {
        return <div>Error: Contract ID is missing.</div>;
    }

    if (isLoading) {
        return <div>Loading contract...</div>;
    }

    if (error && !formData) {
        return <div>Error: {error}</div>;
    }

    if (!contract || !formData) {
        return <div>Contract was not found.</div>;
    }

    return (
        <Box sx={{ maxWidth: 1100 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                Edit {contract.title}
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
                                onChange={(event) =>
                                    updateField("supplierId", event.target.value)
                                }
                                required
                                fullWidth
                            >
                                {suppliers.map((supplier) => (
                                    <MenuItem
                                        key={supplier.supplierId}
                                        value={supplier.supplierId}
                                    >
                                        {supplier.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Title"
                                value={formData.title}
                                onChange={(event) =>
                                    updateField("title", event.target.value)
                                }
                                required
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                value={formData.description ?? ""}
                                onChange={(event) =>
                                    updateField("description", event.target.value)
                                }
                                multiline
                                minRows={3}
                                fullWidth
                            />
                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <DateField
                                    label="Start date"
                                    value={formData.startDate}
                                    onChange={(value) => updateField("startDate", value)}
                                    required
                                />
                                <DateField
                                    label="End date"
                                    value={formData.endDate}
                                    onChange={(value) =>
                                        updateField("endDate", value || null)
                                    }
                                />
                                <DateField
                                    label="Action date"
                                    value={formData.actionDate}
                                    onChange={(value) =>
                                        updateField("actionDate", value || null)
                                    }
                                />
                            </Stack>
                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    label="Notice period"
                                    type="number"
                                    value={formData.noticePeriodValue ?? ""}
                                    onChange={(event) =>
                                        updateField(
                                            "noticePeriodValue",
                                            event.target.value === ""
                                                ? null
                                                : Number(event.target.value),
                                        )
                                    }
                                    slotProps={{ htmlInput: { min: 0 } }}
                                    fullWidth
                                />
                                <TextField
                                    select
                                    label="Notice period unit"
                                    value={formData.noticePeriodUnit ?? ""}
                                    onChange={(event) =>
                                        updateField(
                                            "noticePeriodUnit",
                                            event.target.value === ""
                                                ? null
                                                : Number(event.target.value),
                                        )
                                    }
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
                        <Button startIcon={<AddIcon />} onClick={addLine}>
                            Add line
                        </Button>
                    </Stack>

                    {formData.contractLines.map((line, index) => (
                        <ContractLineEditor
                            key={line.contractLineId ?? `new-${index}`}
                            line={line}
                            index={index}
                            catalogItems={catalogItems}
                            onChange={updateLine}
                            onRemove={() => removeLine(index)}
                        />
                    ))}

                    {formData.contractLines.length === 0 && (
                        <Typography color="text.secondary">
                            This contract has no lines. Add a line or save to remove all
                            existing lines.
                        </Typography>
                    )}

                    <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/contracts/${contractId}`)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save changes"}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}

function toUpdateRequest(contract: ContractDto): UpdateContractRequest {
    return {
        supplierId: contract.supplierId,
        title: contract.title,
        description: contract.description,
        startDate: contract.startDate,
        endDate: contract.endDate,
        actionDate: contract.actionDate,
        noticePeriodValue: contract.noticePeriodValue,
        noticePeriodUnit: contract.noticePeriodUnit,
        employeeId: "",
        contractLines: contract.contractLines.map((line) => ({
            contractLineId: line.contractLineId,
            catalogItemId: line.catalogItemId,
            producer: line.producer,
            model: line.model,
            price: line.price,
            quantity: line.quantity,
            description: line.description,
            initialAmount: line.initialAmount,
            deliveryFrequencyInterval: line.deliveryFrequencyInterval,
            deliveryFrequencyUnit: line.deliveryFrequencyUnit,
            paymentFrequencyInterval: line.paymentFrequencyInterval,
            paymentFrequencyUnit: line.paymentFrequencyUnit,
        })),
    };
}

function DateField({
    label,
    value,
    onChange,
    required = false,
}: {
    label: string;
    value: string | null;
    onChange: (value: string) => void;
    required?: boolean;
}) {
    return (
        <TextField
            label={label}
            type="date"
            value={value ?? ""}
            onChange={(event) => onChange(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            required={required}
            fullWidth
        />
    );
}

function ContractLineEditor({
    line,
    index,
    catalogItems,
    onChange,
    onRemove,
}: {
    line: UpdateContractLineRequest;
    index: number;
    catalogItems: CatalogItemDto[];
    onChange: (
        index: number,
        field: keyof UpdateContractLineRequest,
        value: string | number | null,
    ) => void;
    onRemove: () => void;
}) {
    return (
        <Paper elevation={0} sx={{ p: 4, border: "1px solid #e0e4e8" }}>
            <Stack spacing={3}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6">Line {index + 1}</Typography>
                    <Button
                        color="error"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={onRemove}
                    >
                        Remove
                    </Button>
                </Stack>

                <TextField
                    select
                    label="Catalog item"
                    value={line.catalogItemId}
                    onChange={(event) =>
                        onChange(index, "catalogItemId", event.target.value)
                    }
                    required
                    fullWidth
                >
                    {catalogItems.map((item) => (
                        <MenuItem key={item.catalogItemId} value={item.catalogItemId}>
                            {item.name} ({item.type === 0 ? "Product" : "Service"})
                        </MenuItem>
                    ))}
                </TextField>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                        label="Producer"
                        value={line.producer ?? ""}
                        onChange={(event) =>
                            onChange(index, "producer", event.target.value)
                        }
                        fullWidth
                    />
                    <TextField
                        label="Model"
                        value={line.model ?? ""}
                        onChange={(event) => onChange(index, "model", event.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Price"
                        type="number"
                        value={line.price}
                        onChange={(event) =>
                            onChange(index, "price", Number(event.target.value))
                        }
                        slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        value={line.quantity ?? ""}
                        onChange={(event) =>
                            onChange(
                                index,
                                "quantity",
                                event.target.value === ""
                                    ? null
                                    : Number(event.target.value),
                            )
                        }
                        slotProps={{ htmlInput: { min: 1 } }}
                        fullWidth
                    />
                </Stack>

                <TextField
                    label="Line description"
                    value={line.description ?? ""}
                    onChange={(event) =>
                        onChange(index, "description", event.target.value)
                    }
                    multiline
                    minRows={2}
                    fullWidth
                />

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                        label="Initial amount"
                        type="number"
                        value={line.initialAmount ?? ""}
                        onChange={(event) =>
                            onChange(
                                index,
                                "initialAmount",
                                event.target.value === ""
                                    ? null
                                    : Number(event.target.value),
                            )
                        }
                        slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                        fullWidth
                    />
                    <TextField
                        label="Delivery interval"
                        type="number"
                        value={line.deliveryFrequencyInterval ?? ""}
                        onChange={(event) =>
                            onChange(
                                index,
                                "deliveryFrequencyInterval",
                                event.target.value === ""
                                    ? null
                                    : Number(event.target.value),
                            )
                        }
                        slotProps={{ htmlInput: { min: 1 } }}
                        fullWidth
                    />
                    <FrequencySelect
                        label="Delivery unit"
                        value={line.deliveryFrequencyUnit}
                        allowEmpty
                        onChange={(value) =>
                            onChange(index, "deliveryFrequencyUnit", value)
                        }
                    />
                    <TextField
                        label="Payment interval"
                        type="number"
                        value={line.paymentFrequencyInterval}
                        onChange={(event) =>
                            onChange(
                                index,
                                "paymentFrequencyInterval",
                                Number(event.target.value),
                            )
                        }
                        slotProps={{ htmlInput: { min: 1 } }}
                        required
                        fullWidth
                    />
                    <FrequencySelect
                        label="Payment unit"
                        value={line.paymentFrequencyUnit}
                        onChange={(value) =>
                            onChange(index, "paymentFrequencyUnit", value ?? 0)
                        }
                    />
                </Stack>
            </Stack>
        </Paper>
    );
}

function FrequencySelect({
    label,
    value,
    onChange,
    allowEmpty = false,
}: {
    label: string;
    value: number | null;
    onChange: (value: number | null) => void;
    allowEmpty?: boolean;
}) {
    return (
        <TextField
            select
            label={label}
            value={value ?? ""}
            onChange={(event) =>
                onChange(event.target.value === "" ? null : Number(event.target.value))
            }
            required={!allowEmpty}
            fullWidth
        >
            {allowEmpty && <MenuItem value="">None</MenuItem>}
            <MenuItem value={0}>Days</MenuItem>
            <MenuItem value={1}>Weeks</MenuItem>
            <MenuItem value={2}>Months</MenuItem>
            <MenuItem value={3}>Years</MenuItem>
        </TextField>
    );
}

export default UpdateContractPage;