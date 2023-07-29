export interface RefundCreate {
    email: string;
    receiptOrInvoiceNumber: string;
    orderId: string;
    productTitle: string;
    productCode: string;
    reason: string;
    description: string
}

export interface RefundProfile extends RefundCreate {
    id: number;
    uuid: string;
    orderId: string;
    status: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    updateReason: string;
}

export type RefundRes = RefundProfile

export type GetListOfAllRefundsResponse = RefundRes[]