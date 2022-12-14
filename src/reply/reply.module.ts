import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CommentsModule } from 'src/comments/comments.module';
import { ReplyController } from './reply.controller';

@Module({
  imports: [CommentsModule],
  controllers: [ReplyController],
  providers: [ReplyService],
  exports: [ReplyService],
})
export class ReplyModule {}
