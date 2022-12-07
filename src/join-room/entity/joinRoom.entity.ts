import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEntity } from '../../rooms/entity/room.entity';

@Entity()
export class JoinedRoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socketId: string;

  @ManyToOne(() => User, (user) => user.joinedRooms)
  user: User;

  @ManyToOne(() => RoomEntity, (room) => room.joinedUser)
  room: RoomEntity;
}
