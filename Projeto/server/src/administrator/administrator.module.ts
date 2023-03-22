import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdministratorController],
  providers: [AdministratorService],
})
export class AdministratorModule { }
