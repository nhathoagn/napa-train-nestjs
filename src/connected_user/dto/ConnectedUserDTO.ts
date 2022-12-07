import { Type } from 'class-transformer';
import { IsObject, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class ConnectedUserDto {
  @IsString()
  @Type(() => String)
  socketId: string;

  @IsObject()
  user: User;
}
