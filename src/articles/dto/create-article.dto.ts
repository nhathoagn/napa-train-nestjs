import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Sign } from 'crypto';

export class CreateArticleDto {
  @ApiProperty({
    description: 'The title of the Article',
    example: 'Hom nay la thu 2',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({
    description: 'The content of the Article',
    example: 'abcxyz',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
