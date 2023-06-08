import {Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        // Jeśli wystąpił błąd uwierzytelnienia lub użytkownik nie został znaleziony,
        // możesz rzucić wyjątkiem, aby przechwycić go wraz z kodem HTTP 401 Unauthorized
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        // Jeśli uwierzytelnienie zakończyło się sukcesem, możesz zwrócić użytkownika
        // do dalszego przetwarzania w żądaniu
        return user;
    }
}
