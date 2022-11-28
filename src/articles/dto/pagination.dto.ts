import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  skip: number;
}
