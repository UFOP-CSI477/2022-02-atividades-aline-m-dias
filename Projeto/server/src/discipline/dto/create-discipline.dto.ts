import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
export class CreateDisciplineDto {
  @IsString()
  name: string;

  @IsString()
  workload: string;

  @IsString()
  university: string;

  @IsInt()
  @Type(() => Number)
  teacherId: number;

  @IsInt()
  @Type(() => Number)
  taskId: number;
}
