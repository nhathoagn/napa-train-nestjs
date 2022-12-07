import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/message/entity/message.entity';
import { RoomUserModule } from 'src/room_user/room_user.module';
import { RoomEntity } from './entity/room.entity';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { JoinRoomModule } from 'src/join-room/join-room.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity, MessageEntity]),
    RoomUserModule,
    JoinRoomModule,
  ],
  providers: [RoomsService],
  exports: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
