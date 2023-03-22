import { IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsString()
  registration: string;

  @IsString()
  email: string;

  @IsString()
  birthDate: string;

  @IsString()
  address: string;
}
