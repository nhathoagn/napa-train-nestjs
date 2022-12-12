import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { RoomEntity } from 'src/rooms/entity/room.entity';
import { User } from 'src/user/entities/user.entity';

export class CreatedMessageDTO {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsString()
  @IsOptional()
  media: string | null;

  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  user: User;

  room: RoomEntity;
}
