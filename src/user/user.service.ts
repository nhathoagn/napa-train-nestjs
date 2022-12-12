import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogoutDto } from 'src/auth/dto/logout.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InfoUserDto } from './dto/info-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findProfile(userId: InfoUserDto) {
    const user = this.userRepository.findOne({
      where: { id: userId.userId },
      select: {
        username: true,
        email: true,
        firstName: true,
        lastName: true,
      },
      // relations: ['followers', 'articles'],
    });
    return user;
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.userRepository.findOneBy({ id });
  }

  // findById(id: number) {
  //   if (!id) {
  //     return null;
  //   }
  //   return this.userRepository.findBy({ id });
  // }

  findByEmail(createUserDto: CreateUserDto) {
    return this.userRepository.findOneBy({
      email: createUserDto.email,
    });
  }
  findByUsername(username: string) {
    return this.userRepository.findOneBy({
      username: username,
    });
  }

  async findUserFavorites(id: number) {
    if (!id) {
      return null;
    }
    const favoriter = await this.userRepository.findOne({
      where: { id },
      relations: ['favorites'],
    });
    return favoriter;
  }

  find(createUserDto: CreateUserDto) {
    return this.userRepository.find({ where: { email: createUserDto.email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.userRepository.save({ ...user, ...updateUserDto });
  }
  async logout(logout: LogoutDto) {
    const user = await this.findByEmail(logout);
    user.refeshToken = null;
    await user.save();
  }
  async unfavorite(articleId: number, user: User) {
    await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['favorites'],
    });
    return { msg: 'infavorite success' };
  }
}
