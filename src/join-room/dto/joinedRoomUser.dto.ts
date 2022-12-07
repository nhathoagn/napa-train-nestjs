import { IsString } from 'class-validator';
import { RoomEntity } from 'src/rooms/entity/room.entity';
import { User } from 'src/user/entities/user.entity';

export class JoinedRoomUserDTO {
  @IsString()
  socketId: string;

  user: User;

  room: RoomEntity;
}
