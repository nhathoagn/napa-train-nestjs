import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReplyDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  commentId: number;
}
