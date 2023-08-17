import {IsOptional, IsString} from "class-validator";


export class RefundUpdateDto {
    @IsOptional()
    orderId: string;

    @IsOptional()
    email: string;

    @IsOptional()
    receiptOrInvoiceNumber: string;

    @IsOptional()
    productTitle: string;

    @IsOptional()
    productCode: string;

    @IsOptional()
    reason: string;

    @IsOptional()
    description: string;

    @IsOptional()
    status: string;

    @IsOptional()
    createdAt: Date | string;

    @IsOptional()
    updatedAt: Date | string;

    @IsOptional()
    updateReason: string;

    @IsOptional()
    @IsString()
    emailContent: string;
}