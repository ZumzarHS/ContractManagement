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
import { getCatalogItemTypeLabel } from "../catalogItemUtils";
import type { CatalogItemDto } from "../types";

export default function CatalogItemsTable({ catalogItems }: { catalogItems: CatalogItemDto[] }) {
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