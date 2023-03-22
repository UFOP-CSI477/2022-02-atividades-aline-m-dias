import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const fields = ['id'];
    const check = fields.every((field) => field in payload);

    if (!check) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.id,
    };
  }
}
