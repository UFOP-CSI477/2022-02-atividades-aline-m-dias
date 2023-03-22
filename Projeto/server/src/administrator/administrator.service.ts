import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';

@Injectable()
export class AdministratorService {
  constructor(private prisma: PrismaService) { }

  async create(createAdministratorDto: CreateAdministratorDto) {
    const { email, name, password } = createAdministratorDto;

    const adminAlreadyExists = await this.prisma.administrator.findUnique({
      where: {
        email,
      },
    });

    if (adminAlreadyExists) {
      throw new BadRequestException(
        'Endereço de e-mail já utilizado por outro administrador.',
      );
    }

    const admin = await this.prisma.administrator.create({
      data: {
        email,
        name,
        password: await hash(password, 6),
      },
    });

    return admin;
  }

  async findAll(index = 0, step = 100) {
    const [items, count] = await Promise.all([
      this.prisma.administrator.findMany({
        skip: index,
        take: step,
      }),
      this.prisma.administrator.count(),
    ]);

    return { items, count };
  }

  async findOne(id: number) {
    const admin = await this.prisma.administrator.findUnique({
      where: {
        id,
      },
    });

    return admin;
  }

  async update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    const { email, name, password } = updateAdministratorDto;

    const adminAlreadyExists = await this.prisma.administrator.findUnique({
      where: {
        email,
      },
    });

    if (adminAlreadyExists) {
      throw new BadRequestException(
        'Endereço de e-mail já utilizado por outro administrador.',
      );
    }

    const admin = await this.prisma.administrator.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        password: await hash(password, 6),
      },
    });

    return admin;
  }

  remove(id: number) {
    return this.prisma.administrator.delete({
      where: {
        id,
      },
    });
  }
}
