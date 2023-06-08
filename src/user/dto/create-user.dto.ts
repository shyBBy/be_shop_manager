import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserCreate } from '../../../types/user/user';

export class UserCreateDto implements UserCreate {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

