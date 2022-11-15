import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comments } from '../../comments/entities/comment.entity';

@Entity('reply')
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  conten: string;
  @ManyToOne(() => Comments, (comment) => comment.reply)
  comment: Comments;
}
