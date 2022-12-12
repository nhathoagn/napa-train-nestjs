import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { ConnectedUserEntity } from './connected_user.entity';
import { ConnectedUserDto } from './dto/ConnectedUserDTO';

@Injectable()
export class ConnectedUserService {
  constructor(
    @InjectRepository(ConnectedUserEntity)
    private readonly connectedUserService: Repository<ConnectedUserEntity>,
  ) {}

  async create(connectedUser: ConnectedUserDto) {
    return this.connectedUserService.save(connectedUser);
  }

  async deleteBySocketId(socketId: string) {
    return this.connectedUserService.delete({ socketId });
  }
  async findByUser(user: UserDTO) {
    return this.connectedUserService.findBy({ user });
  }
}
