import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CommentsDTO extends BaseEntity {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
