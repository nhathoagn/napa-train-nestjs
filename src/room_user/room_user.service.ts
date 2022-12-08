import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { RoomDataDTO } from 'src/rooms/dto/roomData.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { Participant } from './room_user.entity';

@Injectable()
export class RoomUserService {
  constructor(
    @InjectRepository(Participant)
    private roomUserService: Repository<Participant>,
  ) {}
  async create(roomData: RoomDataDTO, creator: UserDTO) {
    const participant = this.roomUserService.create({
      user: creator,
      room: roomData,
    });
    return this.roomUserService.save(participant);
  }

  async getUserRooms(user: UserDTO) {
    return this.roomUserService.find({
      where: { id: user.id },
    });
  }
  // const users = this.userService.findById(user.userId)
  // const room = this.roomUserService.find({
  //   where: { users: users },
  //   relations: ['rooms'],
  // });
  async getRoom(socket: Socket) {
    return await this.roomUserService
      .createQueryBuilder('roomUser')
      .innerJoinAndSelect('roomUser.room', 'room')
      .where('roomUser.userId = :userId', { userId: socket.data.user.id })
      .getMany();

    // const userRooms = await this.roomUserService.find({
    //   where: {
    //     users: {
    //       id: user.userId,
    //     },
    //   },
    //   relations: {
    //     rooms: true,
    //   },
    // });
    // console.log(
    //   'user',
    //   userRooms.map((u) => u.rooms),
    // );
  }

  async findRoomMaster(roomId: number) {
    return await this.roomUserService
      .createQueryBuilder('roomUser')
      .innerJoinAndSelect('roomUser.user', 'user')
      .where('roomUser.roomId = :roomId', { roomId: roomId })
      .getOne();
  }
}
