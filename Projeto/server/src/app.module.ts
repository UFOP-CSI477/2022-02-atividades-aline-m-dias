import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClassModule } from './class/class.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { DisciplineModule } from './discipline/discipline.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { TaskModule } from './task/task.module';
import { TeacherModule } from './teacher/teacher.module';
import { AdministratorModule } from './administrator/administrator.module';

@Module({
  imports: [
    PrismaModule,
    StudentModule,
    AuthModule,
    TeacherModule,
    TaskModule,
    DisciplineModule,
    DeliveriesModule,
    ClassModule,
    AdministratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
