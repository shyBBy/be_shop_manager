import {Controller, Post, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserObj } from '../decorators/user-object.decorator';
import { UserEntity } from '../user/entities/user.entity';
import {LocalAuthGuard} from "../guards/local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@UserObj() user: UserEntity, @Res() res: Response) {
    console.log(user)
    return this.authService.login(user, res);
  }
}
