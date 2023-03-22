import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  index?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  step?: number;
}
