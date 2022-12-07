import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomUserService } from 'src/room_user/room_user.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RoomDataDTO } from './dto/roomData.dto';
import { RoomEntity } from './entity/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomService: Repository<RoomEntity>,
    private roomUserService: RoomUserService,
  ) {}

  async createRoom(roomData: RoomDataDTO, creator: User) {
    const createRoom = await this.roomService.save({
      ...roomData,
    });
    const participant = await this.roomUserService.create(createRoom, creator);
    return participant;
  }

  async getRoom(roomId: number) {
    return await this.roomService
      .createQueryBuilder('room')
      .where('room.id = :roomId', { roomId })
      .getOne();
  }
}
