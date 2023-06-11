import {BadRequestException, forwardRef, Inject, Injectable} from '@nestjs/common';
import {sign} from 'jsonwebtoken';
import {UserEntity} from '../user/entities/user.entity';
import {hashPwd} from '../utils/password.utils';
import {UserService} from '../user/user.service';
import {DataSource} from 'typeorm';
import {Response} from 'express';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private dataSource: DataSource,
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.getByEmail(email);
        if (user && user.password === hashPwd(password)) {
            return user;
        }
        throw new BadRequestException('Błędny login lub hasło.');
    }

    async login(user: UserEntity, res: Response) {
        const payload = {email: user.email};
        const token = sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});

        const updateUser = await this.userService.getByEmail(user.email)
        updateUser.isTokenValid = true
        await updateUser.save();

        const response = {
            isSuccess: true,
            message: `Pomyślnie zalogowano`,
            statusCode: 200,
            data: {
                token,
                email: user.email,
                uuid: user.uuid
            }
        }

        return res.json(response);
    }

    async logout(user: UserEntity) {
        // Unieważnienie tokenu użytkownika (np. zapisanie go do bazy danych jako unieważnionego)
        await this.invalidateToken(user.email);
    }

    async isTokenValid(email: string): Promise<boolean> {
        // Sprawdzenie, czy token jest ważny (np. sprawdzenie w bazie danych, czy token nie został unieważniony)
        const isTokenValid = await this.checkIfTokenValidInDatabase(email);
        return isTokenValid;
    }

    private async checkIfTokenValidInDatabase(email: string): Promise<boolean> {
        // Implementacja logiki sprawdzającej ważność tokenu w bazie danych
        // Zwraca true, jeśli token jest ważny, lub false w przeciwnym razie
        // Możesz dostosować tę metodę do Twojej bazy danych i modelu danych

        // Przykładowa implementacja w oparciu o pola "email" i "isTokenValid" w modelu użytkownika

        const user = await UserEntity.findOneBy({email})

        if (!user || !user.isTokenValid) {
            return false;
        }

        return true;
    }

    private async invalidateToken(email: string): Promise<void> {
        // Implementacja logiki unieważnienia tokenu w bazie danych
        // Możesz dostosować tę metodę do Twojej bazy danych i modelu danych

        // Przykładowa implementacja w oparciu o pola "email" i "isTokenValid" w modelu użytkownika

        const user = await this.userService.getByEmail(email);

        if (user) {
            user.isTokenValid = false
            await user.save()

        }
    }

}