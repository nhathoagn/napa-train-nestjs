/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { classToPlain, Exclude } from 'class-transformer';
import { Articles } from 'src/articles/entities/article.entity';
import { Comments } from 'src/comments/entities/comment.entity';
import { UserResponse } from 'src/common/user.models';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('user')
export class User extends BaseEntity {
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User email', example: 'hoang@gmail.com' })
  @Column({ default: false })
  email: string;

  @ApiProperty({ description: 'username' })
  @Column()
  username: string;

  @ApiProperty({ description: 'Hashed user password' })
  @Column({ default: false })
  @Exclude()
  password: string;

  @ApiProperty({ description: 'firstName' })
  @Column({ default: false })
  firstName: string;

  @ApiProperty({ description: 'lastName' })
  @Column({ default: false })
  lastName: string;

  @ApiProperty({ description: 'address' })
  @Column({ default: false })
  address: string;

  @ApiProperty({ description: 'refeshToken' })
  @Column({ default: false })
  @Exclude()
  refeshToken: string;

  @ApiProperty({ description: 'followers' })
  @ManyToMany(() => User, (user) => user.followee)
  @JoinTable()
  followers: User[];

  @ApiProperty({ description: 'followee' })
  @ManyToMany(() => User, (user) => user.followers)
  followee: User[];

  @OneToMany(() => Articles, (articles) => articles.user)
  articles: Articles[];

  @OneToMany(() => Comments, (comments) => comments.author)
  comments: Comments[];

  @ManyToMany(() => Articles, (articles) => articles.favoritesBy)
  @JoinColumn()
  favorites: Articles[];
}
