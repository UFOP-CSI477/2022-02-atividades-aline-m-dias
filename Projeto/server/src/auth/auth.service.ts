import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.administrator.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Não autorizado');
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) throw new UnauthorizedException('Não autorizado');

    return user;
  }

  async signin(user) {
    const token = jwt.sign(
      {
        id: user.id,
      },
      this.config.get('JWT_SECRET'),
      { expiresIn: '45 days' },
    );

    const userData = await this.prisma.administrator.findUniqueOrThrow({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    return {
      accessToken: token,
      user: userData,
    };
  }

  async getMe(id: number) {
    const user = await this.prisma.administrator.findUniqueOrThrow({
      where: { id: id },
      select: {
        name: true,
        email: true,
        created_at: true,
        id: true,
        updated_at: true,
      },
    });

    return {
      user,
    };
  }
}
