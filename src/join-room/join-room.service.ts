import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { PageOptionsDto } from 'src/rooms/dto/roomOption.dto';
import { Repository } from 'typeorm';
import { JoinedRoomUserDTO } from './dto/joinedRoomUser.dto';
import { JoinedRoomEntity } from './entity/joinRoom.entity';

@Injectable()
export class JoinRoomService {
  constructor(
    @InjectRepository(JoinedRoomEntity)
    private joinedRoomRepository: Repository<JoinedRoomEntity>,
  ) {}

  async create(joinedRoomUser: JoinedRoomUserDTO) {
    return this.joinedRoomRepository.save(joinedRoomUser);
  }

  async deleteBySocketId(socketId: string) {
    return this.joinedRoomRepository.delete({ socketId });
  }

  async findByRoom(roomId: number) {
    return await this.joinedRoomRepository
      .createQueryBuilder('joinedUsers')
      .leftJoin('joinedUsers.room', 'room')
      .where('room.id = :roomId', { roomId: roomId })
      .getMany();
  }

  async findUserRoom(roomId: number, userId: string) {
    return await this.joinedRoomRepository
      .createQueryBuilder('joinRoom')
      .leftJoinAndSelect('joinRoom.user', 'user')
      .where('joinRoom.roomId = :roomId', { roomId: roomId })
      .andWhere('joinRoom.userId = :userId', { userId: userId })
      .getMany();
  }

  async findUser(roomId: number) {
    return await this.joinedRoomRepository
      .createQueryBuilder('joinRoom')
      .innerJoinAndSelect('joinRoom.user', 'user')
      .where('joinRoom.roomId = :roomId', { roomId: roomId })
      .getMany();
  }

  async paginateRoom(socket: Socket, query: PageOptionsDto) {
    const queryBuilder = await this.joinedRoomRepository
      .createQueryBuilder('roomUser')
      .leftJoinAndSelect('roomUser.room', 'room')
      .where('roomUser.userId = :userId', { userId: socket.data.user.id })
      .skip(query.skip)
      .take(query.take)
      .getMany();
    console.log(queryBuilder);

    // const options: IPaginationOptions = {
    //   limit: 10,
    //   page: 1
    // }
    // return paginate<RoomDataDTO>(queryBuilder,options)
  }

  async getRoom(socket: Socket) {
    return await this.joinedRoomRepository.find({
      where: { socketId: socket.id },
      relations: ['roomId'],
    });
  }
}
