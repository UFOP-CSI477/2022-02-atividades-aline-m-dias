import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
  imports: [PrismaModule],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule { }
