import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ReplyModule } from './reply/reply.module';
import { GatewayModule } from './gateway/gateway.module';
import { ConnectedUserModule } from './connected_user/connected_user.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomUserModule } from './room_user/room_user.module';
import { JoinRoomModule } from './join-room/join-room.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    CommentsModule,
    AuthModule,
    ArticlesModule,
    FavoriteModule,
    ReplyModule,
    GatewayModule,
    ConnectedUserModule,
    RoomsModule,
    RoomUserModule,
    JoinRoomModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
