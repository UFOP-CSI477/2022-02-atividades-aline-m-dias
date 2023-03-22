import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule, PrismaModule, ConfigModule],
  providers: [JwtStrategy, LocalStrategy, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
