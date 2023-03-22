import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) { }

  async create(createTaskDto: CreateTaskDto) {
    const { classId, deliveryDate, description, studentId } = createTaskDto;

    const task = await this.prisma.task.create({
      data: {
        description,
        deliveryDate: new Date(deliveryDate),
        class: { connect: { id: classId } },
        student: { connect: { id: studentId } },
      },
    });

    return task;
  }

  async findAll(index = 0, step = 100) {
    const [items, count] = await Promise.all([
      this.prisma.task.findMany({
        include: {
          class: {
            select: {
              name: true,
            },
          },
          student: {
            select: {
              name: true,
            },
          },
        },
        skip: index,
        take: step,
      }),
      this.prisma.task.count(),
    ]);

    return { items, count };
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { classId, deliveryDate, description, studentId } = updateTaskDto;

    const updatedTask = await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        description,
        deliveryDate: new Date(deliveryDate),
        class: { connect: { id: classId } },
        student: { connect: { id: studentId } },
      },
    });

    return updatedTask;
  }

  remove(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
