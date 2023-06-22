import {BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { StoreEntity } from '../../store/entities/store.entity';

@Entity({
    database: process.env.DB_DATABASE,
    name: 'user',
})
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        default: '',
    })
    uuid: string;

    @Column({
        default: '',
    })
    email: string;

    @Column({
        default: '',
    })
    password: string;

    @Column({
        default: false,
    })
    isTokenValid: boolean;

    @Column({
        default: false,
    })
    active_store: boolean;

    // @OneToOne(() => StoreEntity, (store) => store.user)
    // store: StoreEntity;

}