import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class SocketDTO {
  @IsString()
  @Type(() => String)
  socketId: string;
}
