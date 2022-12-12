import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InfoUserDto } from 'src/user/dto/info-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Follow } from './follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
  async createFollow(currentUser: User, { username }: InfoUserDto) {
    const user = await this.userService.findByUsername(username);
    const follow = this.followRepository.create({
      followers: currentUser,
      followee: user,
    });
    return this.followRepository.save(follow);
  }
  async findFollow(currentUser: User, user: User) {
    if (!user) {
      return null;
    }
    const query = await this.followRepository
      .createQueryBuilder('unfollow')
      .select('id')
      .where('followersId =:followersid', { followersid: currentUser.id })
      .andWhere('followeeId =:followeeid', { followeeid: user.id })
      .execute();
    return query;
  }
  async removeFollow(currentUser: User, { username }: InfoUserDto) {
    const userId = await this.userService.findByUsername(username);
    const favorite = await this.findFollow(currentUser, userId);
    if (!favorite) {
      throw new NotFoundException('user not found');
    }
    await this.followRepository.remove(favorite);
    return { msg: 'unfollow success' };
  }
}
