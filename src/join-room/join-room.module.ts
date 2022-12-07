import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinedRoomEntity } from './entity/joinRoom.entity';
import { JoinRoomService } from './join-room.service';

@Module({
  imports: [TypeOrmModule.forFeature([JoinedRoomEntity])],
  providers: [JoinRoomService],
  exports: [JoinRoomService],
})
export class JoinRoomModule {}
