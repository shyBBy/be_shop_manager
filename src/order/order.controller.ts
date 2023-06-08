import {Controller, Get, Param, Put, UseGuards} from '@nestjs/common';
import {OrderService} from './order.service';
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {GetListOfAllOrdersResponse} from "../../types/order/order";
import {UserObj} from "../decorators/user-object.decorator";
import {UserEntity} from "../user/entities/user.entity";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @Get('/list')
    @UseGuards(JwtAuthGuard)
    getAll(@UserObj() user: UserEntity): Promise<GetListOfAllOrdersResponse> {
        return this.orderService.getAllOrders(user.uuid)
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    getOneById(
        @Param('id') id: string,
        @UserObj() user: UserEntity) {
        return this.orderService.getOneById(id, user.uuid)
    }

    // @Put('/status/:id')
    // @UseGuards(JwtAuthGuard)
    // updateStatus(
    //     @Param('id') id: string,
    //     @UserObj() user: UserEntity
    // ){
    //     return this.orderService.updateStatus(id, user.uuid)
    // }


}
