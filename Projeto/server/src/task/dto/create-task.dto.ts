import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  description: string;

  @IsString()
  deliveryDate: Date;

  @IsInt()
  @Type(() => Number)
  studentId: number;

  @IsInt()
  @Type(() => Number)
  classId: number;
}
