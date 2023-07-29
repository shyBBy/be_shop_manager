import {IsNotEmpty, IsString} from "class-validator";

export class RefundCreateDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    receiptOrInvoiceNumber: string;

    @IsString()
    @IsNotEmpty()
    productTitle: string;

    @IsString()
    @IsNotEmpty()
    productCode: string;

    @IsString()
    @IsNotEmpty()
    reason: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    orderId: string;



}