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
import { EventsGateway } from './chat/events/events.gateway';
import { GatewayController } from './gateway/gateway.controller';
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
    EventsGateway,
  ],
  controllers: [AppController, GatewayController],
  providers: [AppService],
})
export class AppModule {}
