import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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

}
