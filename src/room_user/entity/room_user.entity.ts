import { RoomEntity } from 'src/rooms/entity/room.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../role/role';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // socketId: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.OWNER,
  })
  role: UserRole;

  @ManyToOne(() => User, (user) => user.participant)
  user: User;

  @ManyToOne(() => RoomEntity, (room) => room.participant)
  room: RoomEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
