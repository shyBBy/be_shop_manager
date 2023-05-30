import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {StoreEntity} from "../../store/entities/store.entity";

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

    // @OneToOne(() => StoreEntity, store => store.userProfile, { eager: true })
    // @JoinColumn()
    // storeData: StoreEntity;


    @OneToMany(()=> StoreEntity, (entity) => entity.userProfile, {
      eager: true
    })
    storeData: StoreEntity[];
}
