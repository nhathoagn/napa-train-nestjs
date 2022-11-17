import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CommentsService } from 'src/comments/comments.service';
import { User } from 'src/user/entities/user.entity';
import { ReplyCommentDto } from './dto/createReplyComment.dto';

@Injectable()
export class ReplyService {
  constructor(
    @Inject(forwardRef(() => CommentsService))
    private commentService: CommentsService,
  ) {}

  async createReply(currentUser: User, reply: ReplyCommentDto) {
    const comment = await this.commentService.findComment(reply);
    const createReply = await this.commentService.create(currentUser, reply);
    await comment.children.push(createReply);
    await comment.save();
    return this.commentService.findOne(reply);
  }
}
