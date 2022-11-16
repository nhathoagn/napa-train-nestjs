import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';
import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CommentsModule } from 'src/comments/comments.module';
import { ReplyController } from './reply.comtroller';

@Module({
  imports: [TypeOrmModule.forFeature([Reply]), CommentsModule],
  controllers: [ReplyController],
  providers: [ReplyService],
  exports: [ReplyService],
})
export class ReplyModule {}
