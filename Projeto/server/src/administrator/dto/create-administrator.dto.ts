import { IsString } from 'class-validator';

export class CreateAdministratorDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
