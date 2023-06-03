import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
  cookieSession({
    name: 'session',
    secret: 'your-secret-key',
    secure: false, // Ustaw na true w przypadku korzystania z protokołu HTTPS
    signed: false, // Ustaw na true, jeśli chcesz podpisywać ciasteczka
    httpOnly: true, // Ustaw na true, aby ciasteczka były dostępne tylko przez protokół HTTP
    maxAge: 1000 * 60 * 60 * 24, // Czas trwania sesji w milisekundach
  }),
);

  // app.enableCors({
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });

  dotenv.config();
  

  await app.listen(3002);
}

bootstrap();
