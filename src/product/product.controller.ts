import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import { ProductService } from './product.service';
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {UserObj} from "../decorators/user-object.decorator";
import {UserEntity} from "../user/entities/user.entity";
import {GetListOfAllProductsResponse} from "../../types/product/product";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  getAll(@UserObj() user: UserEntity): Promise<GetListOfAllProductsResponse> {
    console.log('w CONTROLLER')
    return this.productService.getAllProducts(user.id);
  }

  @Get('/:ean')
  @UseGuards(JwtAuthGuard)
  getOneByEan(@Param('ean') ean: string, @UserObj() user: UserEntity) {
    return this.productService.getOneByEan(ean, user.id);
  }

}
