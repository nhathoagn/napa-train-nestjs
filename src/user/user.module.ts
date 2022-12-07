import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { FollowModule } from 'src/follow/follow.module';
import { MessageEntity } from 'src/message/entity/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, MessageEntity]),
    PassportModule,
    forwardRef(() => FollowModule),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
