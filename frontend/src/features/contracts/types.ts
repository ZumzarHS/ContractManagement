export interface ContractListDto {
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
    supplierName: string;
}

export interface ContractDto extends ContractListDto {
    contractLines: ContractLineDto[];
}

export interface ContractLineDto {
    contractLineId: string;
    catalogItemId: string;
    catalogItemName: string;
    producer: string | null;
    model: string | null;
    price: number;
    quantity: number | null;
    description: string | null;
    initialAmount: number | null;
    deliveryFrequencyInterval: number | null;
    deliveryFrequencyUnit: number | null;
    paymentFrequencyInterval: number;
    paymentFrequencyUnit: number;
}