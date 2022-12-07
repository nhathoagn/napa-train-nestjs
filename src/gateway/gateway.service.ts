import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ConnectedUserService } from 'src/connected_user/connected_user.service';

@Injectable()
export class GatewayService {
  constructor(private connectedUserService: ConnectedUserService) {}

  findAll() {
    return `This action returns all gateway`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gateway`;
  }

  remove(id: number) {
    return `This action removes a #${id} gateway`;
  }
  async disconnect(socket: Socket) {
    await this.connectedUserService.deleteBySocketId(socket.id);
    socket.disconnect();
  }
}
