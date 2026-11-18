import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getCatalogItems } from "../api/catalogItemsApi";
import type { CatalogItemDto } from "../types";
import CatalogItemsTable from "../components/CatalogItemsTable";

function CatalogItemsPage() {
    const navigate = useNavigate();
    const [catalogItems, setCatalogItems] = useState<CatalogItemDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadCatalogItems() {
            try {
                const data = await getCatalogItems();
                setCatalogItems(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred while fetching catalog items.");
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadCatalogItems();
    }, []);

    if (isLoading) {
        return <div>Loading catalog items...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Stack
                direction="row"
                sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }}
            >
                <Typography variant="h4">Catalog Items</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/catalogitems/new")}
                >
                    Create Catalog Item
                </Button>
            </Stack>

            <CatalogItemsTable catalogItems={catalogItems} />
        </div>
    );
}

export default CatalogItemsPage;
