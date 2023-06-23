import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user/entities/user.entity';
import { OrderModule } from './order/order.module';
import { StoreModule } from './store/store.module';
import { StoreEntity } from './store/entities/store.entity';
import { FurgonetkaModule } from './furgonetka/furgonetka.module';
import {OrderEntity} from "./order/entities/order.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, StoreEntity, OrderEntity],
      bigNumberStrings: Boolean(process.env.DB_BIG_NUMBER_STRINGS),
      logging: Boolean(process.env.DB_LOGGING),
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    }),
    UserModule,
    AuthModule,
    OrderModule,
    StoreModule,
    FurgonetkaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
