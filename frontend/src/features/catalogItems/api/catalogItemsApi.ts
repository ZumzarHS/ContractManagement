import { apiGet } from "../../../lib/apiClient";
import type { CatalogItemDto } from "../types";

export function getCatalogItems(): Promise<CatalogItemDto[]> {
    return apiGet<CatalogItemDto[]>("/catalogitems");
}

export function getCatalogItemById(catalogItemId: string): Promise<CatalogItemDto> {
    return apiGet<CatalogItemDto>(`/catalogitems/${catalogItemId}`);
}
