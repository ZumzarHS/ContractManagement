export function getContractStatusLabel(status: number): string {
    return ["Pending", "Active", "Completed", "Terminated"][status] ?? "Unknown";
}

export function getActionStatusLabel(status: number): string {
    return ["None", "Upcoming", "Requires action"][status] ?? "Unknown";
}

export function formatNoticePeriod(
    value: number | null,
    unit: number | null,
): string | null {
    if (value === null || unit === null) {
        return null;
    }

    let unitLabel: string;

    switch (unit) {
        case 0:
            unitLabel = "days";
            break;
        case 1:
            unitLabel = "months";
            break;
        case 2:
            unitLabel = "years";
            break;
        default:
            return "Unknown";
    }

    return `${value} ${unitLabel}`;
}