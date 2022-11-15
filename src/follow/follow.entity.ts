import { User } from 'src/user/entities/user.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('follow')
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.followee)
  followers: User;
  @ManyToOne(() => User, (user) => user.followers)
  followee: User;
}
