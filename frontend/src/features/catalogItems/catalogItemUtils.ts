export function getCatalogItemTypeLabel(type: number): string {
    return ["Product", "Service"][type] ?? "Unknown";
}
