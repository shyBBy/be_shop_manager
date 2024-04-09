import {forwardRef, Module} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {StoreModule} from "../store/store.module";

@Module({
  imports: [forwardRef(() => StoreModule)],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
