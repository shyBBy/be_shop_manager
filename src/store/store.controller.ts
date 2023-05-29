import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { StoreService } from './store.service';
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {UserEntity} from "../user/entities/user.entity";
import {UserObj} from "../decorators/user-object.decorator";
import {StoreCreateDto} from "./dto/create-store.dto";

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {

  }

  @Post('/create')
  // @UseGuards(JwtAuthGuard)
  create(@Body() createStoreDto: StoreCreateDto) {
    return this.storeService.create(createStoreDto);
  }
}
