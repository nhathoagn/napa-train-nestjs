/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Articles } from 'src/articles/entities/article.entity';
import { Favorite } from 'src/favorite/favorite.entity';
import { Comments } from 'src/comments/entities/comment.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Follow } from 'src/follow/follow.entity';
import { MessageEntity } from 'src/message/entity/message.entity';
import { JoinedRoomEntity } from 'src/join-room/entity/joinRoom.entity';
import { Participant } from 'src/room_user/room_user.entity';
import { ConnectedUserEntity } from 'src/connected_user/connected_user.entity';
@Entity('user')
export class User extends BaseEntity {
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User email', example: 'hoang@gmail.com' })
  @Column({ default: false })
  email: string;

  @ApiProperty({ description: 'username' })
  @Column({ default: false })
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
  @Column({ default: false, nullable: true })
  @Exclude()
  refeshToken: string;

  @ApiProperty({ description: 'followers' })
  @OneToMany(() => User, (user) => user.followee)
  followers: Follow[];

  @ApiProperty({ description: 'followee' })
  @OneToMany(() => User, (user) => user.followers)
  followee: Follow[];

  @OneToMany(() => Articles, (articles) => articles.user)
  articles: Articles[];

  @OneToMany(() => Comments, (comments) => comments.author)
  comments: Comments[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => MessageEntity, (mess) => mess.user)
  message: MessageEntity[];

  @OneToMany(() => JoinedRoomEntity, (joinedRooms) => joinedRooms.room)
  joinedRooms: JoinedRoomEntity[];

  @OneToMany(() => Participant, (participant) => participant.user)
  participant: Participant[];

  @OneToMany(() => ConnectedUserEntity, (connected) => connected.user)
  connections: ConnectedUserEntity[];
}
