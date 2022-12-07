import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { GateWay } from './app.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConnectedUserModule } from 'src/connected_user/connected_user.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { RoomUserModule } from 'src/room_user/room_user.module';
import { JoinRoomModule } from 'src/join-room/join-room.module';
import { MessageModule } from 'src/message/message.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    JwtModule.register({}),
    ConnectedUserModule,
    RoomsModule,
    RoomUserModule,
    JoinRoomModule,
    MessageModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService, GateWay],
  exports: [GatewayService, GateWay],
})
export class GatewayModule {}
