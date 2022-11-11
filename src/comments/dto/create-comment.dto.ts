import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateCommentDto extends BaseEntity {
  @ApiProperty({ description: 'comments' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
