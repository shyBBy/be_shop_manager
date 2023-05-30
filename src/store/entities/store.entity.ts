import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";

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

    // @OneToOne(() => UserEntity, user => user.storeData)
    // userProfile: UserEntity;

    @ManyToOne((type) => UserEntity, (entity) => entity.storeData)
    userProfile: UserEntity;

}