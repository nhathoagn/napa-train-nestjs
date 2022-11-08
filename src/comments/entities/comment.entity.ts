import { ApiProperty } from '@nestjs/swagger';
import { Articles } from 'src/articles/entities/article.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Comments {
  @ApiProperty({ description: 'Primary key as Comment ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'Comments of the Articles', example: 'abc' })
  @Column()
  content: string;
  @ApiProperty({ description: 'comment post date', example: '07/11/2022' })
  @Column()
  createAt: Date;
  @ManyToOne(() => Articles, (articles) => articles.comments)
  articles: Articles;
}
