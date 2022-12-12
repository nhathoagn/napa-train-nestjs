import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/message/entity/message.entity';
import { RoomUserModule } from 'src/room_user/room_user.module';
import { RoomEntity } from './entity/room.entity';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity, MessageEntity]),
    RoomUserModule,
  ],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
