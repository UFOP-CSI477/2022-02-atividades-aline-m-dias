import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) { }

  async create(createTeacherDto: CreateTeacherDto) {
    const { email, name } = createTeacherDto;

    const teacherExists = await this.prisma.teacher.findUnique({
      where: {
        email,
      },
    });

    if (teacherExists) {
      throw new BadRequestException(
        'Endereço de e-mail já utilizado por outro professor.',
      );
    }

    const teacher = await this.prisma.teacher.create({
      data: {
        name,
        email,
      },
    });

    return teacher;
  }

  async findAll(index = 0, step = 100) {
    const [items, count] = await Promise.all([
      this.prisma.teacher.findMany({
        skip: index,
        take: step,
      }),
      this.prisma.teacher.count(),
    ]);

    return { items, count };
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const { name, email } = updateTeacherDto;

    const updatedTeacher = await this.prisma.teacher.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });

    return updatedTeacher;
  }

  remove(id: number) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}
