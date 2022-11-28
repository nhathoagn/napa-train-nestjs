import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creatorUsername: string;
}
