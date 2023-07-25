export interface RefundCreate {
    email: string;
    receiptOrInvoiceNumber: string;
    productTitle: string;
    productCode: string;
    reason: string;
    description: string
}

export interface RefundProfile extends RefundCreate {
    id: number;
    uuid: string;
    status: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    updateReason: string;
}

export type RefundRes = RefundProfile