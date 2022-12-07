import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RoomDTO {
  @IsOptional()
  @IsNumber()
  roomId: number;

  @IsOptional()
  @IsString()
  userId: string;
}
