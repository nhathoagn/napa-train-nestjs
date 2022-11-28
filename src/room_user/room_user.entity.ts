import { RoomEntity } from 'src/rooms/entity/room.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.participant)
  users: User;

  @ManyToOne(() => RoomEntity, (room) => room.participant)
  rooms: RoomEntity;
}
