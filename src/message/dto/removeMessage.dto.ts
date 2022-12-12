import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RemoveMessage {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}
