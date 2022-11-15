import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteService } from 'src/favorite/favorite.service';
import { UserModule } from 'src/user/user.module';
import { Follow } from './follow.entity';
import { FollowService } from './follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follow]), forwardRef(() => UserModule)],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
