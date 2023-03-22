import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) { }

  async create(createStudentDto: CreateStudentDto) {
    const { address, birthDate, email, name, registration } = createStudentDto;

    const studentExists = await this.prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (studentExists) {
      throw new BadRequestException(
        'Endereço de e-mail já utilizado por outro estudante.',
      );
    }

    const student = await this.prisma.student.create({
      data: {
        address,
        birthDate: new Date(birthDate),
        email,
        name,
        registration,
      },
    });

    return student;
  }

  async findAll(index = 0, step = 100) {
    const [items, count] = await Promise.all([
      this.prisma.student.findMany({
        skip: index,
        take: step,
      }),
      this.prisma.student.count(),
    ]);

    return { items, count };
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const { address, birthDate, email, name, registration } = updateStudentDto;

    const updatedStudent = await this.prisma.student.update({
      where: {
        id,
      },
      data: {
        address,
        birthDate: new Date(birthDate),
        email,
        name,
        registration,
      },
    });

    return updatedStudent;
  }

  remove(id: number) {
    return this.prisma.student.delete({
      where: { id },
    });
  }
}
