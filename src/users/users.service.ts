import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async findAll() {
    // return this.usersRepository.find();
    await this.usersRepository.createQueryBuilder('user').getMany();
  }

  async findOne(id: number) {
    // return this.usersRepository.findOneBy({ id });
    const findUserWithRepositoryQueryBuilder = await this.usersRepository
      .createQueryBuilder()
      .where('user.id :userId', { User: id })
      .getOne();
    return findUserWithRepositoryQueryBuilder;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // const user = await this.findOne(id);
    // return this.usersRepository.save({ ...user, ...updateUserDto });
    const updateUserWithRepositoryQueryBuilder = await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id: id });
    return updateUserWithRepositoryQueryBuilder;
  }

  async remove(id: number) {
    // return this.usersRepository.delete({ id });
    const removeUserWithRepositoryQueryBuilder = await this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: id })
      .execute();
    return removeUserWithRepositoryQueryBuilder;
  }
}
