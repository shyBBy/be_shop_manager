import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy, VerifiedCallback} from 'passport-jwt';
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";

export interface JwtPayload {
    email: string;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        const { email } = payload;

        const user = await this.userService.getByEmail(email);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        const isTokenValid = await this.authService.isTokenValid(email);
        if (!isTokenValid) {
            throw new UnauthorizedException('Token has been invalidated');
        }

        return payload;
    }
}
