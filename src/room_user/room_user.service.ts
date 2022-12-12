import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { PageOptionsDto } from 'src/rooms/dto/roomOption.dto';
import { RoomDataDTO } from 'src/rooms/dto/roomData.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { Participant } from './entity/room_user.entity';
import { UserRole } from './role/role';
import { RoomEntity } from 'src/rooms/entity/room.entity';

@Injectable()
export class RoomUserService {
  constructor(
    @InjectRepository(Participant)
    private roomUserRepository: Repository<Participant>,
  ) {}
  async create(roomData: RoomDataDTO, socket: Socket) {
    const participant = this.roomUserRepository.create({
      user: socket.data.user,
      room: roomData,
    });
    return this.roomUserRepository.save(participant);
  }

  async addUser(roomData: RoomEntity, user: UserDTO) {
    const participant = this.roomUserRepository.create({
      user: user,
      room: roomData,
      role: UserRole.GUEST,
    });
    return this.roomUserRepository.save(participant);
  }
  async deleteBySocketId(userId: string) {
    return this.roomUserRepository.delete(userId);
  }

  async getUserRooms(user: UserDTO) {
    return this.roomUserRepository.find({
      where: { id: user.id },
    });
  }

  async getRoom(socket: Socket) {
    return await this.roomUserRepository
      .createQueryBuilder('roomUser')
      .innerJoinAndSelect('roomUser.room', 'room')
      .where('roomUser.userId = :userId', { userId: socket.data.user.id })
      .getMany();
  }

  async findRoomMaster(roomId: number) {
    return await this.roomUserRepository
      .createQueryBuilder('roomUser')
      .innerJoinAndSelect('roomUser.user', 'user')
      .where('roomUser.roomId = :roomId', { roomId: roomId })
      .getOne();
  }

  async paginateRoom(socket: Socket, query: PageOptionsDto) {
    await this.roomUserRepository
      .createQueryBuilder('roomUser')
      .leftJoinAndSelect('roomUser.room', 'room')
      .where('roomUser.userId = :userId', { userId: socket.data.user.id })
      .skip(query.skip)
      .take(query.take)
      .getMany();
  }

  async findUserRoom(roomId: number, userId: string) {
    return await this.roomUserRepository
      .createQueryBuilder('joinRoom')
      .leftJoinAndSelect('joinRoom.user', 'user')
      .where('joinRoom.roomId = :roomId', { roomId: roomId })
      .andWhere('joinRoom.userId = :userId', { userId: userId })
      .getMany();
  }
}
