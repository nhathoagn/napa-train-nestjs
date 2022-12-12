import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Participant } from './entity/room_user.entity';
import { RoomUserService } from './room_user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant]), UserModule],
  providers: [RoomUserService],
  exports: [RoomUserService],
})
export class RoomUserModule {}
