export interface CatalogItemDto {
    catalogItemId: string;
    name: string;
    description: string | null;
    type: number;
}

export interface CreateCatalogItemRequest {
    name: string;
    description: string | null;
    type: number;
}
