import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatedMessageDTO } from './dto/createMessage.dto';
import { MessageEntity } from './entity/message.entity';
import { Socket } from 'socket.io';
import { RoomDataDTO } from 'src/rooms/dto/roomData.dto';
import { RoomEntity } from 'src/rooms/entity/room.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageService: Repository<MessageEntity>,
  ) {}
  async create(message: CreatedMessageDTO, socket: Socket, roomId: RoomEntity) {
    return this.messageService.save({
      ...message,
      user: socket.data.user,
      room: roomId,
    });
  }
}
