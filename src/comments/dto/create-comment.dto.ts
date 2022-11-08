import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'comments' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
