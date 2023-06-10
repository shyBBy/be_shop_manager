import {Controller, Get, Post, Res, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserObj } from '../decorators/user-object.decorator';
import { UserEntity } from '../user/entities/user.entity';
import {LocalAuthGuard} from "../guards/local-auth.guard";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@UserObj() user: UserEntity, @Res() res: Response) {
    return this.authService.login(user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@UserObj() user: UserEntity) {
    console.log(user)
    return this.authService.logout(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/checklogin')
  check() {
    return {test: 'jestem zalogowany'}
  }
}
