import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import { FurgonetkaService } from './furgonetka.service';
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

export interface FurgonetkaUser {
  username: string;
  password: string;
}

@Controller('furgonetka')
export class FurgonetkaController {
  constructor(private readonly furgonetkaService: FurgonetkaService) {}

  // @Get('/label/:id')
  // @UseGuards(JwtAuthGuard)
  // getLabel(@Param('id') id: string,) {
  //   return this.furgonetkaService.downloadShippingLabel(id)
  // }

  // @Post('token')
  // async getToken(@UserObj() user: UserEntity) {
  //   return await this.furgonetkaService.getToken(user.uuid);
  // }
}
