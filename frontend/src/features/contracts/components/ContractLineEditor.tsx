import {
    Button,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { CatalogItemDto } from "../../catalogItems/types";
import type { UpdateContractLineRequest} from "../types";

export default function ContractLineEditor({
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