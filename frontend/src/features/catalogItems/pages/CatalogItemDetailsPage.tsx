import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Stack, Typography } from "@mui/material";
import { getCatalogItemById } from "../api/catalogItemsApi";
import { getCatalogItemTypeLabel } from "../catalogItemUtils";
import type { CatalogItemDto } from "../types";

function CatalogItemDetailsPage() {
    const { catalogItemId } = useParams<{ catalogItemId: string }>();
    const [catalogItem, setCatalogItem] = useState<CatalogItemDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!catalogItemId) {
            return;
        }

        const id = catalogItemId;

        async function loadCatalogItem() {
            try {
                const data = await getCatalogItemById(id);
                setCatalogItem(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred while fetching the catalog item.");
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadCatalogItem();
    }, [catalogItemId]);

    if (!catalogItemId) {
        return <div>Error: Catalog item ID is missing.</div>;
    }

    if (isLoading) {
        return <div>Loading catalog item...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!catalogItem) {
        return <div>Catalog item was not found.</div>;
    }

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {catalogItem.name}
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Detail label="Catalog item ID" value={catalogItem.catalogItemId} />
                    <Detail
                        label="Type"
                        value={getCatalogItemTypeLabel(catalogItem.type)}
                    />
                    <Detail label="Description" value={catalogItem.description} />
                </Stack>
            </Paper>
        </div>
    );
}

function Detail({ label, value }: { label: string; value: string | null }) {
    return (
        <div>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            <Typography>{value ?? "—"}</Typography>
        </div>
    );
}

export default CatalogItemDetailsPage;
