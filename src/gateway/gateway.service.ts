import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ConnectedUserService } from 'src/connected_user/connected_user.service';

@Injectable()
export class GatewayService {
  constructor(private connectedUserService: ConnectedUserService) {}

  async disconnect(socket: Socket) {
    await this.connectedUserService.deleteBySocketId(socket.id);
    socket.disconnect();
  }
}
