import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
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
    return this.productService.getAllProducts(user.id);
  }

  @Get('/variant/list/:id')
  @UseGuards(JwtAuthGuard)
  getAllProductsVariants(@Param('id') id: string, @UserObj() user: UserEntity): Promise<GetListOfAllProductsResponse> {
    return this.productService.getAllProductsVariants(id, user.id);
  }

  @Get('/update/stock/:id/:quantity')
  @UseGuards(JwtAuthGuard)
  updateStockQuantity(
      @Param('id') id: string,
      @Param('quantity') quantity: string,
      @UserObj() user: UserEntity) {
      return this.productService.updateStockQuantity(id, quantity, user.id);
  }

  @Get('/id/:id')
  @UseGuards(JwtAuthGuard)
  getOneById(@Param('id') id: string, @UserObj() user: UserEntity) {
    return this.productService.getOneById(id, user.id);
  }

  @Get('/name/:name')
  @UseGuards(JwtAuthGuard)
  getOneByName(@Param('name') name: string, @UserObj() user: UserEntity) {
    return this.productService.getOneByName(name, user.id);
  }

  @Get('/:ean')
  @UseGuards(JwtAuthGuard)
  getOneByEan(@Param('ean') ean: string, @UserObj() user: UserEntity) {
    return this.productService.getOneByEan(ean, user.id);
  }

}