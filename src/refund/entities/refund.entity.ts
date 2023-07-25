import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
    database: process.env.DB_DATABASE,
    name: 'refund',
})
export class RefundEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: '',
    })
    uuid: string;

    @Column({
        default: '',
    })
    orderId: string;

    @Column({
        default: '',
    })
    email: string;

    @Column({
        default: '',
    })
    receiptOrInvoiceNumber: string;

    @Column({
        default: '',
    })
    productTitle: string;

    @Column({
        default: '',
    })
    productCode: string;

    @Column({
        default: '',
    })
    reason: string;

    @Column({
        default: '',
    })
    description: string;

    @Column({
        default: '',
    })
    status: string;

    @Column({
        type: 'datetime',
        default: null,
    })
    createdAt: Date | string;

    @Column({
        type: 'datetime',
        default: null,
    })
    updatedAt: Date | string;

    @Column({
        default: ''
    })
    updateReason: string;
}