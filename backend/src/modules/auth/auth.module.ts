import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '~/infrastructure/database/database.module';
import { AuthGuard } from '../../common/guards/auth.guard';
import { userProvider } from '../user/user.provider';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtConfig } from '~/config/jwt.config';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwt = configService.get<JwtConfig>('jwt')!;
        return {
          secret: jwt.secret,
          privateKey: jwt.private_key,
          publicKey: jwt.public_key,
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [...userProvider, AuthService, UserService, AuthGuard],
  exports: [AuthGuard, JwtModule, UserService],
})
export class AuthModule {}
