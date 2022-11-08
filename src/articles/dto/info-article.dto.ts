import { IsNotEmpty, IsNumber } from 'class-validator';

export class InfoArticle {
  @IsNotEmpty()
  @IsNumber()
  articleId: number;
}
