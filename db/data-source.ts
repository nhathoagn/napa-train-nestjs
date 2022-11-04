import { User } from 'src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'social',
  entities: [User],
  synchronize: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
