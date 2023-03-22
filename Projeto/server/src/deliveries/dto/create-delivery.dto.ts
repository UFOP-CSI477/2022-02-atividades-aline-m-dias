import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  deliveryDate: Date;

  @IsInt()
  @Type(() => Number)
  grades: number;

  @IsInt()
  @Type(() => Number)
  studentId: number;
}
