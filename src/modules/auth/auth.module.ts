import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtTokensService } from './services/jwt-tokens.service';
import { JWTStrategy } from './strategies/jwt.strategy';
import { getJWTConfig } from '../../config/JWT.config';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, JwtTokensService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJWTConfig,
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  exports: [JwtTokensService],
})
export class AuthModule {}
