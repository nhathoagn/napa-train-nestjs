import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { RoomDTO } from 'src/rooms/dto/room.dto';
import { Repository } from 'typeorm';
import { JoinedRoomUserDTO } from './dto/joinedRoomUser.dto';
import { ParamsDTO } from './dto/params.dto';
import { JoinedRoomEntity } from './entity/joinRoom.entity';

@Injectable()
export class JoinRoomService {
  constructor(
    @InjectRepository(JoinedRoomEntity)
    private joinedRoomService: Repository<JoinedRoomEntity>,
  ) {}

  async create(joinedRoomUser: JoinedRoomUserDTO) {
    return this.joinedRoomService.save(joinedRoomUser);
  }

  async deleteBySocketId(socketId: string) {
    return this.joinedRoomService.delete({ socketId });
  }

  async findByRoom(roomId: number) {
    return await this.joinedRoomService
      .createQueryBuilder('joinedUsers')
      .leftJoin('joinedUsers.room', 'room')
      .where('room.id = :roomId', { roomId: roomId })
      .getMany();
  }

  async findUserRoom(roomId: number, userId: string) {
    return await this.joinedRoomService
      .createQueryBuilder('joinRoom')
      .leftJoinAndSelect('joinRoom.user', 'user')
      .where('joinRoom.roomId = :roomId', { roomId: roomId })
      .andWhere('joinRoom.userId = :userId', { userId: userId })
      .getMany();
  }

  async findUser(roomId: number) {
    return await this.joinedRoomService
      .createQueryBuilder('joinRoom')
      .innerJoinAndSelect('joinRoom.user', 'user')
      .where('joinRoom.roomId = :roomId', { roomId: roomId })
      .getMany();
  }

  async getRoom(socket: Socket) {
    return await this.joinedRoomService.find({
      where: { socketId: socket.id },
      relations: ['roomId'],
    });
  }
}
