import { ApiProperty } from '@nestjs/swagger';
import { Articles } from 'src/articles/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reply } from '../../reply/entities/reply.entity';
@Entity()
export class Comments extends BaseEntity {
  @ApiProperty({ description: 'Primary key as Comment ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Comments of the Articles', example: 'abc' })
  @Column()
  content?: string;

  @ApiProperty({ description: 'comment post date', example: '07/11/2022' })
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Articles, (articles) => articles.comments)
  articles: Articles;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @OneToMany(() => Reply, (reply) => reply.comment)
  reply: Reply[];
}
