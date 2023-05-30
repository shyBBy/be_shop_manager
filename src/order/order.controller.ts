import {Controller, Get, UseGuards} from '@nestjs/common';
import { OrderService } from './order.service';
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {UserObj} from "../decorators/user-object.decorator";
import {UserEntity} from "../user/entities/user.entity";
import {GetListOfAllOrdersResponse} from "../../types/order/order";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  getAll(@UserObj() user: UserEntity): Promise<GetListOfAllOrdersResponse> {
    return this.orderService.getAllOrders(user.storeData[0].url,user.storeData[0].consumer_key, user.storeData[0].consumer_secret)
  }
}
