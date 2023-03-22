import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';

@Injectable()
export class DisciplineService {
  constructor(private prisma: PrismaService) { }

  async create(createDisciplineDto: CreateDisciplineDto) {
    const { name, taskId, teacherId, university, workload } =
      createDisciplineDto;

    const discipline = await this.prisma.discipline.create({
      data: {
        name,
        university,
        workload,
        teacher: { connect: { id: teacherId } },
        task: { connect: { id: taskId } },
      },
    });

    return discipline;
  }

  async findAll(index = 0, step = 100) {
    const [items, count] = await Promise.all([
      this.prisma.discipline.findMany({
        include: {
          teacher: {
            select: {
              name: true,
            },
          },
          task: {
            select: {
              description: true,
            },
          },
        },
        skip: index,
        take: step,
      }),
      this.prisma.discipline.count(),
    ]);

    return { items, count };
  }

  async findOne(id: number) {
    const discipline = await this.prisma.discipline.findUnique({
      where: { id },
    });

    return discipline;
  }

  async update(id: number, updateDisciplineDto: UpdateDisciplineDto) {
    const { name, taskId, teacherId, university, workload } =
      updateDisciplineDto;

    const updatedDiscipline = await this.prisma.discipline.update({
      where: {
        id,
      },
      data: {
        name,
        university,
        workload,
        teacher: { connect: { id: teacherId } },
        task: { connect: { id: taskId } },
      },
    });

    return updatedDiscipline;
  }

  remove(id: number) {
    return this.prisma.discipline.delete({
      where: { id },
    });
  }
}
