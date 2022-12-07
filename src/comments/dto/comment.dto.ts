import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CommentsDTO extends BaseEntity {
  @ApiProperty({ description: 'commentId' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  commentId: number;

  @ApiProperty({ description: 'articleId' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  articleId: number;

  @ApiProperty({ description: 'comments' })
  @IsOptional()
  @IsString()
  content: string;
}
