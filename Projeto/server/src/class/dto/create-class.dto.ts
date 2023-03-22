import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsString()
  year: string;

  @IsInt()
  @Type(() => Number)
  teacherId: number;
}
