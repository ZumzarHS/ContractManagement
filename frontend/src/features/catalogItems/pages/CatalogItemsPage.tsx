import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { getCatalogItems } from "../api/catalogItemsApi";
import { getCatalogItemTypeLabel } from "../catalogItemUtils";
import type { CatalogItemDto } from "../types";

function CatalogItemsPage() {
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
            <Typography variant="h4" sx={{ mb: 3 }}>
                Catalog items
            </Typography>

            <CatalogItemsTable catalogItems={catalogItems} />
        </div>
    );
}

function CatalogItemsTable({ catalogItems }: { catalogItems: CatalogItemDto[] }) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Catalog item</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {catalogItems.map((catalogItem) => (
                        <TableRow key={catalogItem.catalogItemId} hover>
                            <TableCell>
                                <Link
                                    to={`/catalogitems/${catalogItem.catalogItemId}`}
                                    style={{
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}
                                >
                                    <Typography sx={{ fontWeight: "medium" }}>
                                        {catalogItem.name}
                                    </Typography>
                                </Link>
                            </TableCell>
                            <TableCell>
                                {getCatalogItemTypeLabel(catalogItem.type)}
                            </TableCell>
                            <TableCell>{catalogItem.description ?? "—"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CatalogItemsPage;
