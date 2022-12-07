import { User } from '../src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Articles } from 'src/articles/entities/article.entity';
import { Comments } from 'src/comments/entities/comment.entity';
import { Favorite } from 'src/favorite/favorite.entity';
import { Follow } from 'src/follow/follow.entity';
import { MessageEntity } from 'src/message/entity/message.entity';
import { RoomEntity } from 'src/rooms/entity/room.entity';
import { JoinedRoomEntity } from 'src/join-room/entity/joinRoom.entity';
import { Participant } from 'src/room_user/room_user.entity';
import { ConnectedUserEntity } from 'src/connected_user/connected_user.entity';
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'social',
  entities: [
    User,
    Articles,
    Comments,
    Favorite,
    Follow,
    MessageEntity,
    RoomEntity,
    JoinedRoomEntity,
    Participant,
    ConnectedUserEntity,
  ],
  synchronize: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
