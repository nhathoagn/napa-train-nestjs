import { User } from 'src/user/entities/user.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Articles } from '../articles/entities/article.entity';

@Entity('favorite')
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Articles, (articles) => articles.favorites)
  articles: Articles;
  @ManyToOne(() => User, (user) => user.favorites)
  user: User;
}
