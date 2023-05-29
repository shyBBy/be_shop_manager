import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserObj } from '../decorators/user-object.decorator';
import { UserCreateDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getMe(@UserObj() user: UserEntity) {
    return this.userService.getMe(user);
  }

  @Post('create')
  create(@Body() createUserDto: UserCreateDto) {
    return this.userService.create(createUserDto);
  }
}
