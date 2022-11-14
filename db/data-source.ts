import { User } from '../src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Articles } from 'src/articles/entities/article.entity';
import { Comments } from 'src/comments/entities/comment.entity';
import { Favorite } from 'src/favorite/favorite.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'social',
  entities: [User, Articles, Comments, Favorite],
  synchronize: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
