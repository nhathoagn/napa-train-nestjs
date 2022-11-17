import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class ReplyCommentDto extends BaseEntity {
  @ApiProperty({ description: 'comments' })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  content: string;

  @ApiProperty({ description: 'comments' })
  @IsOptional()
  @Type(() => Number)
  commentId: number;

  @ApiProperty({ description: 'articleId' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  articleId: number;
}
