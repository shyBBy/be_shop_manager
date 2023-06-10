import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from "./auth.service";

export interface JwtPayload {
    email: string;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload) {
        const { email } = payload;

        // Dodaj logikę sprawdzania unieważnionych tokenów tutaj
        const isTokenValid = await this.authService.isTokenValid(email);
        if (!isTokenValid) {
            throw new UnauthorizedException('Token has been invalidated');
        }

        return payload;
    }
}
