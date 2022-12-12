import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatedMessageDTO } from './dto/createMessage.dto';
import { MessageEntity } from './entity/message.entity';
import { Socket } from 'socket.io';
import { RoomEntity } from 'src/rooms/entity/room.entity';
import { RemoveMessage } from './dto/removeMessage.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRopository: Repository<MessageEntity>,
  ) {}
  async create(message: CreatedMessageDTO, socket: Socket, roomId: RoomEntity) {
    return this.messageRopository.save({
      ...message,
      user: socket.data.user,
      room: roomId,
    });
  }

  async findMess(messageData: RemoveMessage) {
    return await this.messageRopository.find({
      where: {
        user: { id: messageData.userId },
        room: { id: messageData.roomId },
        text: messageData.message,
      },
    });
  }

  findById(messageId: number) {
    return this.messageRopository.findOne({
      where: {
        id: messageId,
      },
    });
  }

  async removeMessage(messageData: MessageEntity) {
    const message = await this.findById(messageData.id);
    return this.messageRopository.save({ ...message, isShow: false });
  }
}
