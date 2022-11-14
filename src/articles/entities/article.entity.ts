import { ApiProperty } from '@nestjs/swagger';
import { Comments } from 'src/comments/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Like,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favorite } from '../../favorite/favorite.entity';
@Entity('articles')
export class Articles extends BaseEntity {
  @ApiProperty({ description: 'Primary key as Article  ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Title Articles', example: 'Hom nay laf thu 2' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Content of Articles' })
  @Column()
  content: string;

  @ApiProperty({ description: 'author of Articles' })
  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @ManyToOne(() => User, (user) => user.favorites)
  favoritesBy: User;

  @OneToMany(() => Comments, (comments) => comments.articles)
  comments: Comments[];

  @OneToMany(() => Favorite, (favorite) => favorite.articles)
  favorites: Favorite[];
}
