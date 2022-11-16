import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CommentsDTO extends BaseEntity {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
