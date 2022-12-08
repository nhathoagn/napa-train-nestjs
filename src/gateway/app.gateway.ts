import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectedUserEntity } from 'src/connected_user/connected_user.entity';
import { ConnectedUserService } from 'src/connected_user/connected_user.service';
import { ParamsDTO } from 'src/join-room/dto/params.dto';
import { JoinRoomService } from 'src/join-room/join-room.service';
import { CreatedMessageDTO } from 'src/message/dto/createMessage.dto';
import { MessageService } from 'src/message/message.service';
import { RoomDTO } from 'src/rooms/dto/room.dto';
import { RoomDataDTO } from 'src/rooms/dto/roomData.dto';
import { RoomsService } from 'src/rooms/rooms.service';
import { RoomUserService } from 'src/room_user/room_user.service';
import { InfoUserDto } from 'src/user/dto/info-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';
import { TokenDTO } from './dto/Token.dto';
import { GatewayService } from './gateway.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class GateWay implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private gatewayService: GatewayService,
    private connectedUserService: ConnectedUserService,
    private roomService: RoomsService,
    private roomUserService: RoomUserService,
    private joinedRoomUserService: JoinRoomService,
    private messageService: MessageService,
  ) {}
  @WebSocketServer() server: Server;
  async handleDisconnect(socket: Socket) {
    this.gatewayService.disconnect(socket);
  }

  async handleConnection(socket: Socket) {
    const decodeToken = this.jwtService.decode(
      socket.handshake.headers.authorization,
    );
    let user: User;
    if (decodeToken !== null) {
      const userId = decodeToken as TokenDTO;
      user = await this.userService.findOne(userId.id);
    }
    if (!user) {
      return this.gatewayService.disconnect(socket);
    }
    socket.data.user = user;
    // const rooms  = await this.roomUserService.getRoom(socket);
    const rooms = await this.joinedRoomUserService.paginateRoom(socket, {
      page: 1,
      take: 4,
    });
    await this.connectedUserService.create({ socketId: socket.id, user });
    return this.server.to(socket.id).emit('rooms', rooms);
  }

  disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(socket: Socket, roomData: RoomDataDTO) {
    const createRoom = await this.roomService.createRoom(
      roomData,
      socket.data.user,
    );
    const user = createRoom.user;
    const connections: ConnectedUserEntity[] =
      await this.connectedUserService.findByUser(user);
    const rooms = await this.roomUserService.getUserRooms(user);
    for (const connection of connections) {
      return this.server.to(connection.socketId).emit('rooms', rooms);
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(socket: Socket, { roomId }: ParamsDTO) {
    const isRoomMaster = await this.roomUserService.findRoomMaster(roomId);
    if (isRoomMaster.user.id == socket.data.user.id) {
      const room = await this.roomService.getRoom(roomId);
      await this.joinedRoomUserService.create({
        socketId: socket.id,
        user: socket.data.user,
        room: room,
      });
    } else {
      return { msg: 'You are not permitted to perform this action' };
    }
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(socket: Socket, { roomId, userId }: RoomDTO) {
    const room = await this.joinedRoomUserService.findUserRoom(roomId, userId);
    console.log(room);

    if (room.length > 0) {
      await this.joinedRoomUserService.deleteBySocketId(socket.id);
    } else {
      return { msg: 'User not in room' };
    }
  }

  @SubscribeMessage('addMessage')
  async handleAddMessage(socket: Socket, message: CreatedMessageDTO) {
    const userJoined = await this.joinedRoomUserService.findUserRoom(
      message.roomId,
      socket.data.user.id,
    );
    if (userJoined.length > 0) {
      const room = await this.roomService.getRoom(message.roomId);

      const createdMessage = await this.messageService.create(
        message,
        socket,
        room,
      );

      // const joinedUsers = await this.joinedRoomUserService.findByRoom(room.id);
      for (const user of userJoined) {
        this.server.to(user.socketId).emit('messageAdded', createdMessage);
      }
    } else {
      return { msg: 'Room not found' };
      // console.log({ msg: 'Room not found' });
    }
  }

  @SubscribeMessage('addUser')
  async handleAddUser(socket: Socket, { roomId, username }: InfoUserDto) {
    const isRoomMaster = await this.roomUserService.findRoomMaster(roomId);
    if (isRoomMaster.user.id == socket.data.user.id) {
      const user = await this.userService.findByUsername(username);
      const room = await this.roomService.getRoom(roomId);
      await this.joinedRoomUserService.create({
        socketId: socket.id,
        user: user,
        room: room,
      });
    } else {
      return { msg: 'You are not permitted to perform this action' };
    }
  }
}
