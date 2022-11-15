import {
  Controller,
  Body,
  Patch,
  Param,
  UseGuards,
  Get,
  Post,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { User } from './entities/user.entity';
import { FavoriteService } from 'src/favorite/favorite.service';
import { FollowService } from 'src/follow/follow.service';
@ApiBearerAuth()
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => FollowService))
    private followService: FollowService,
  ) {}

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Get('/me')
  async getInfo(@CurrentUser() id: number) {
    const profile = await this.userService.findProfile(id);
    return profile;
  }

  @Post('/:username/follow')
  async follow(@CurrentUser() user: User, @Param('username') username: string) {
    const profile = this.followService.createFollow(user, username);
    return profile;
  }

  @Post('/:username/unfollow')
  async unfollow(
    @CurrentUser() user: User,
    @Param('username') username: string,
  ) {
    return this.followService.removeFollow(user, username);
  }
}
