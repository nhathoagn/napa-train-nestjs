import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
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

  async findProfile(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['followers', 'articles', 'favorites', 'followee'],
    });
    return user;
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(createUserDto: CreateUserDto) {
    return this.userRepository.findOneBy({
      email: createUserDto.email,
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

  async followUser(currentUser: User, username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['followers'],
    });
    const userDetail = await this.findOne(currentUser.id);
    user.followers.push(userDetail);
    await user.save();
    return user;
  }

  async unfollowUser(currentUser: User, username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['followers'],
    });
    user.followers.filter((followers) => followers != currentUser);
    await user.save();
    return user;
  }
  async unfavorite(articleId: number, user: User) {
    const user_Ar = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['favorites'],
    });
    console.log('user_Ar', user_Ar);

    // await this.userRepository.remove(user_Ar);
    return { msg: 'infavorite success' };
  }
}
