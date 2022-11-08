import { ApiProperty } from '@nestjs/swagger';
import { Articles } from 'src/articles/entities/article.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'User email', example: 'hoang@gmail.com' })
  @Column()
  email: string;
  @ApiProperty({ description: 'Hashed user password' })
  @Column()
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
  @OneToMany(() => Articles, (articles) => articles.user)
  articles: Articles[];
}
