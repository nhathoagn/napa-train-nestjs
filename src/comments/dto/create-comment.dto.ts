import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateCommentDto extends BaseEntity {
  @ApiProperty({ description: 'comments' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'articleId' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  articleId: number;

  @ApiProperty({ description: 'articleId' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  commentId: number;
}
