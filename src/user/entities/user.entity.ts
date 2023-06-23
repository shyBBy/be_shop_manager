import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {StoreEntity} from '../../store/entities/store.entity';

@Entity({
    database: process.env.DB_DATABASE,
    name: 'user',
})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: '',
    })
    email: string;

    @Column({
        default: '',
    })
    password: string;

    @OneToOne(() => StoreEntity, store => store.user_profile, {
        eager: true,
    })
    @JoinColumn()
    store: StoreEntity;

}
