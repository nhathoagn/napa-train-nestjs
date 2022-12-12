import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { RoomUserService } from 'src/room_user/room_user.service';
import { Repository } from 'typeorm';
import { RoomDataDTO } from './dto/roomData.dto';
import { RoomEntity } from './entity/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    private roomUserService: RoomUserService,
  ) {}

  async createRoom(roomData: RoomDataDTO, socket: Socket) {
    const createRoom = await this.roomRepository.save({
      ...roomData,
    });
    const participant = await this.roomUserService.create(createRoom, socket);
    return participant;
  }

  async getRoom(roomId: number) {
    return await this.roomRepository
      .createQueryBuilder('room')
      .where('room.id = :roomId', { roomId })
      .getOne();
  }
}
