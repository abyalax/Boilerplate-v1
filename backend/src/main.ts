import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';

import { GlobalExceptionFilter } from './common/filters/global';
import { AppModule } from './app.module';

import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { CookieConfig } from './config/cookie.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalException = new GlobalExceptionFilter();
  const configService = app.get(ConfigService);
  const cookie = configService.get<CookieConfig>('cookie')!;
  app.use(cookieParser(cookie.secret));
  app.useGlobalFilters(globalException);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => console.log('Nest Aplication running on http://localhost:3000'))
  .catch((err) => console.log(err));
