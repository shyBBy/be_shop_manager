import {forwardRef, HttpException, HttpStatus, Inject, Injectable,} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {AuthService} from '../auth/auth.service';
import {UserCreateDto} from './dto/create-user.dto';
import {createResponse} from '../utils/createResponse';
import {UserEntity} from './entities/user.entity';
import {hashPwd} from '../utils/password.utils';
import {UserRes} from '../../types/user/user';

@Injectable()
export class UserService {
    constructor(
        private dataSource: DataSource,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    ) {
    }

    async create(createUserDto: UserCreateDto) {
        const {email, password} = createUserDto;

        const checkEmail = await UserEntity.findOneBy({email});

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
            .createQueryBuilder(UserEntity, 'user')
            .select(['user.id', 'user.email'])
            .leftJoinAndSelect('user.store', 'store')
            .addSelect(['store.id', 'store.name', 'store.url'])
            .where({email: user.email})
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
        return await UserEntity.findOneBy({email});
    }

}
