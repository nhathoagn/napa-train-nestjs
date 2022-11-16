import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsService } from 'src/comments/comments.service';
import { CommentsDTO } from 'src/comments/dto/comment.dto';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ReplyDto } from './dto/reply.dto';
import { Reply } from './entities/reply.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
    @Inject(forwardRef(() => CommentsService))
    private commentService: CommentsService,
  ) {}

  async createReply(
    currentUser: User,
    reply: CreateCommentDto,
    commentId: ReplyDto,
  ) {
    const comment = await this.commentService.findComment(commentId);
    const createReply = this.replyRepository.create({
      conten: reply.content,
      comment: comment,
    });
    await createReply.save();
    return { msg: 'reply comment success' };
  }
}
