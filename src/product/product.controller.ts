import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import { ProductService } from './product.service';
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {UserObj} from "../decorators/user-object.decorator";
import {UserEntity} from "../user/entities/user.entity";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:ean')
  @UseGuards(JwtAuthGuard)
  getOneByEan(@Param('ean') ean: string, @UserObj() user: UserEntity) {
    return this.productService.getOneByEan(ean, user.id);
  }
}
