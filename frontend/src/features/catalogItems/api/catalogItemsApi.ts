import { apiGet, apiPost } from "../../../lib/apiClient";
import type { CatalogItemDto, CreateCatalogItemRequest } from "../types";

export function getCatalogItems(): Promise<CatalogItemDto[]> {
    return apiGet<CatalogItemDto[]>("/catalogitems");
}

export function getCatalogItemById(catalogItemId: string): Promise<CatalogItemDto> {
    return apiGet<CatalogItemDto>(`/catalogitems/${catalogItemId}`);
}

export function createCatalogItem(
    catalogItem: CreateCatalogItemRequest,
): Promise<string> {
    return apiPost<CreateCatalogItemRequest, string>("/catalogitems", catalogItem);
}
