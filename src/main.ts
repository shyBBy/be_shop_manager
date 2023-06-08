import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN_DOMAIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: Boolean(process.env.CORS_CREDENTIALS),
    allowedHeaders: 'Content-Type, Accept',
  });

  dotenv.config();
  

  await app.listen(3002);
}

bootstrap();
