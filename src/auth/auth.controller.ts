import {Controller, Get, Post, Res, Req, UseGuards, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserObj } from '../decorators/user-object.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {WpLoginDto} from "./dto/wp-login.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@UserObj() user: UserEntity, @Res() res: Response) {
    return this.authService.login(user, res);
  }

  @Post('wp-login')
  @UseGuards(JwtAuthGuard)
  async wpLogin(
      @UserObj() user: UserEntity,
      @Body() wpLoginDto: WpLoginDto,
  ) {
    return this.authService.wpLogin(wpLoginDto, user);
  }

  @Get('wp-login/token')
  @UseGuards(JwtAuthGuard)
  async checkWpToken(
      @UserObj() user: UserEntity
  ) {
    return this.authService.checkWpToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    return this.authService.logout(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/checklogin')
  check() {
    return { test: 'jestem zalogowany' };
  }
}
