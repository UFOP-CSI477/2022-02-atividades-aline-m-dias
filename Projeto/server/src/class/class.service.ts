import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) { }

  async create(createClassDto: CreateClassDto) {
    const { name, year, teacherId } = createClassDto;

    const createdClass = await this.prisma.class.create({
      data: {
        name,
        year,
        teacher: { connect: { id: teacherId } },
      },
    });

    return createdClass;
  }

  async findAll(index = 0, step = 100) {
    const [items, count] = await Promise.all([
      this.prisma.class.findMany({
        include: {
          teacher: {
            select: {
              name: true,
            },
          },
        },
        skip: index,
        take: step,
      }),
      this.prisma.class.count(),
    ]);

    return { items, count };
  }

  async findOne(id: number) {
    const findClass = await this.prisma.class.findUnique({
      where: {
        id,
      },
    });

    return findClass;
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    const { name, teacherId, year } = updateClassDto;

    const updatedClass = await this.prisma.class.update({
      where: {
        id,
      },
      data: {
        name,
        year,
        teacher: { connect: { id: teacherId } },
      },
    });

    return updatedClass;
  }

  remove(id: number) {
    return this.prisma.class.delete({
      where: {
        id,
      },
    });
  }
}
