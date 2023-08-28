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
import { hashPwd } from '../utils/password.utils';
import { UserRes } from '../../types/user/user';
import {ActivationCode} from "../utils/activationCodeCreater";
import {activationAccountMailTemplate} from "../utils/activationAccountMailTemplate";
import {MailerService} from "@nestjs-modules/mailer";
import {ActivationUserDto} from "./dto/activation-user.dto";

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    private readonly mailerService: MailerService,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  async create(createUserDto: UserCreateDto) {
    const { email, password } = createUserDto;

    const activationCode = ActivationCode.create();
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
      user.email = email;
      user.password = hashPwd(password);
      user.isActive = false;
      user.activationCode = activationCode;
      await user.save();
      await this.mailerService.sendMail({
                to: `${email}`,
                subject: 'Kod aktywacyjny',
                text: 'Kod aktywacyjny',
                html: activationAccountMailTemplate(activationCode),
            })
      return createResponse(true, 'Pomyślnie utworzono konto, sprawdź skrzynkę pocztową i aktywuj konto!', 200);
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
      .createQueryBuilder(UserEntity, 'user')
      .select(['user.id', 'user.email', 'user.isActive'])
      .leftJoinAndSelect('user.store', 'store')
      .addSelect(['store.id', 'store.name', 'store.url'])
      .where({ email: user.email })
      .getOne();

    let storeData = null;
    if (selectedUser.store) {
      storeData = {
        id: selectedUser.store.id,
        name: selectedUser.store.name,
        url: selectedUser.store.url,
      };
    }

    return {
      id: selectedUser.id,
      email: selectedUser.email,
      isActive: selectedUser.isActive,
      store: storeData,
    };

    // return {
    //     id: selectedUser.id,
    //     email: selectedUser.email,
    //     store: selectedUser.store ? {
    //         id: selectedUser.store.id,
    //         name: selectedUser.store.name,
    //         url: selectedUser.store.url,
    //     } : null,
    // };
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    return await UserEntity.findOneBy({ email });
  }

    async activation(activationUserDto: ActivationUserDto) {
        const { email, activationCode } = activationUserDto;
        const user = await UserEntity.findOneBy({ email });

        if (!user) {
            throw new HttpException(
                {
                    message: `Konto o podanym adresie e-mail nie znajduje się w bazie danych.`,
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        const compare: boolean = ActivationCode.compare(user.activationCode, activationCode)

        if (!compare) {
            throw new HttpException(
                {
                    message: `Niepoprawny kod aktywacyjny`,
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        try {

            user.isActive = true;
            await user.save();
            return createResponse(true, 'Pomyślnie aktywowano konto, możesz się zalogować', 200);

        } catch (e) {
            throw new HttpException(
                {
                    message: `Coś poszło nie tak, spróbuj ponownie.`,
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
