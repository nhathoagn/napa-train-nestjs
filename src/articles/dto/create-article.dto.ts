import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'The title of the Article',
    example: 'Hom nay la thu 2',
  })
  @IsString()
  title: string;
  @ApiProperty({
    description: 'The content of the Article',
    example: 'abcxyz',
  })
  @IsString()
  content: string;
}
