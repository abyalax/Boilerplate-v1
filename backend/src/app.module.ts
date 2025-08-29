import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import database from './config/database.config';
import cookie from './config/cookie.config';
import jwt from './config/jwt.config';

@Module({
  imports: [
    ProductModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, jwt, cookie],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
