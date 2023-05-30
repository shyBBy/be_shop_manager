import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UserCreateDto } from './dto/create-user.dto';
import { createResponse } from '../utils/createResponse';
import { UserEntity } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { hashPwd } from '../utils/password.utils';
import { UserRes } from '../../types/user/user';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  async create(createUserDto: UserCreateDto) {
    const { email, password } = createUserDto;

    const checkEmail = await UserEntity.findOneBy({ email });

    if (checkEmail) {
      throw new HttpException(
        {
          message: `Konto o podanym email: ${email} już istnieje.`,
          isSuccess: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const user = new UserEntity();
      user.id = uuid();
      user.email = email;
      user.password = hashPwd(password);
      await user.save();
      return createResponse(true, 'Pomyślnie utworzono konto', 200);
    } catch (e) {
      throw new HttpException(
        {
          message: `Coś poszło nie tak, spróbuj później.`,
          isSuccess: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getMe(user: UserEntity): Promise<UserRes> {
    const selectedUser = await this.dataSource
      .createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where({ email: user.email })
      .getOne();
    return {
      id: selectedUser.id,
      email: selectedUser.email,

    };
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    return await UserEntity.findOneBy({ email });
  }

  //END - LAST SIGN
}
