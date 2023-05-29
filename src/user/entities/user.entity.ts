import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
