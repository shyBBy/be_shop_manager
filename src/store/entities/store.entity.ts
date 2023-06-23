import {UserEntity} from '../../user/entities/user.entity';
import {BaseEntity, Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';

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
        length: 1000, // Zwiększona długość kolumny na 1000
    })
    furgonetka_access_token: string;


    @OneToOne(() => UserEntity, user => user.store)
    @JoinTable()
    user_profile: UserEntity;

}
