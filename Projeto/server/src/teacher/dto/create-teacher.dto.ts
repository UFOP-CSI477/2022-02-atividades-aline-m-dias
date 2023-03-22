import { IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  name: string;

  @IsString()
  email: string;
}
