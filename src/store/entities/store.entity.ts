import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    database: process.env.DB_DATABASE,
    name: 'store',
})

export class StoreEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: '',
    })
    name: string;

    @Columnt()
    is_valid: boolean;

    @Column({
        default: '',
    })
    url: string;

    @Column({
        default: '',
    })
    consumer_key: string;

    @Column({
        default: '',
    })
    consumer_secret: string;

    @Column({
        default: '',
    })
    admin_login: string;

    @Column({
        default: '',
    })
    admin_password: string;
}