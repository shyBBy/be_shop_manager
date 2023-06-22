import {UserEntity} from "../../user/entities/user.entity";
import {BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity({
    database: process.env.DB_DATABASE,
    name: 'store',
})

export class StoreEntity extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        default: '',
    })
    uuid: string;

    @Column({
        default: '',
    })
    name: string;

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
    user_uuid: string;

    @Column({
        default: '',
        length: 1000, // Zwiększona długość kolumny na 1000
    })
    furgonetka_access_token: string;

    // @OneToOne(() => UserEntity, (user) => user.store)
    // user: UserEntity;
}