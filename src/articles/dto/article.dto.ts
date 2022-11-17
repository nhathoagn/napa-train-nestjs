import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ArticleDto {
  @ApiProperty({
    description: 'page',
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @ApiProperty({
    description: 'limit',
    example: 'limit',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  limit = 10;
}
