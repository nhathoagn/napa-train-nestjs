import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class InfoArticle {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  articleId: number;
}
                