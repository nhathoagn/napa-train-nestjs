import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesService } from 'src/articles/articles.service';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
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
    commentId: number,
  ) {
    const comment = await this.commentService.findComment(
      currentUser,
      commentId,
    );
    const createReply = this.replyRepository.create({
      conten: reply.content,
      comment: comment,
    });
    await createReply.save();
    return { msg: 'reply comment success' };
  }
}
