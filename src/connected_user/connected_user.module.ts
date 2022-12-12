import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectedUserEntity } from './connected_user.entity';
import { ConnectedUserService } from './connected_user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectedUserEntity])],
  providers: [ConnectedUserService],
  exports: [ConnectedUserService],
})
export class ConnectedUserModule {}
