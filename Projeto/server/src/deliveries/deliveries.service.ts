import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(private prisma: PrismaService) { }

  async create(createDeliveryDto: CreateDeliveryDto) {
    const { deliveryDate, grades, studentId } = createDeliveryDto;

    const delivery = await this.prisma.deliveries.create({
      data: {
        deliveryDate: new Date(deliveryDate),
        grades,
        student: { connect: { id: studentId } },
      },
    });

    return delivery;
  }

  async findAll(index = 0, step = 100) {
    const [items, count] = await Promise.all([
      this.prisma.deliveries.findMany({
        include: {
          student: {
            select: {
              name: true,
            },
          },
        },
        skip: index,
        take: step,
      }),
      this.prisma.deliveries.count(),
    ]);

    return { items, count };
  }

  async findOne(id: number) {
    const delivery = await this.prisma.deliveries.findUnique({
      where: {
        id,
      },
    });

    return delivery;
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    const { deliveryDate, grades, studentId } = updateDeliveryDto;

    const updatedDelivery = await this.prisma.deliveries.update({
      where: {
        id,
      },
      data: {
        deliveryDate: new Date(deliveryDate),
        grades,
        student: { connect: { id: studentId } },
      },
    });

    return updatedDelivery;
  }

  remove(id: number) {
    return this.prisma.deliveries.delete({
      where: { id },
    });
  }
}
