export interface ContractDto {
    contractId: string;
    title: string;
    description: string | null;
    startDate: string;
    endDate: string | null;
    actionDate: string | null;
    noticePeriodValue: number | null;
    noticePeriodUnit: number | null;
    contractStatus: number;
    actionStatus: number;
    supplierId: string;
}
