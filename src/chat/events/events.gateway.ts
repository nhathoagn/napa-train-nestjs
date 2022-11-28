import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
// import { RoomData } from '../rooms/dto/roomData.dto';
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  // private static rooms: Map<string, > = new Map();
  private static participants: Map<string, string> = new Map();

  handleConnection(socket: Socket): void {
    // const socketId = socket.id;
    // EventsGateway.participants.set(socketId, '');
  }
  handleDisconnect(socket: Socket): void {}
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
  }
}
