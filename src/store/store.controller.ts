import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {StoreService} from './store.service';
import {StoreCreateDto} from "./dto/create-store.dto";
import {UserObj} from "../decorators/user-object.decorator";
import {UserEntity} from "../user/entities/user.entity";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {

    }


    @Post('/create')
    @UseGuards(JwtAuthGuard)
    create(
        @Body() createStoreDto: StoreCreateDto,
        @UserObj() user: UserEntity
    ) {
        return this.storeService.create(createStoreDto, user.id);
    }
}
