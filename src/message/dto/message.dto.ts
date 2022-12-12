import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MessageDTO {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  roomId: number;
}
