import { ApiProperty } from '@nestjs/swagger';
import { Comments } from 'src/comments/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Articles {
  @ApiProperty({ description: 'Primary key as Article  ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'Title Articles', example: 'Hom nay laf thu 2' })
  @Column()
  title: string;
  @ApiProperty({ description: 'Content of Articles' })
  @Column()
  content: string;
  @ManyToOne(() => User, (user) => user.articles)
  user: User;
  @OneToMany(() => Comments, (comments) => comments.articles)
  comments: Comments[];
}
