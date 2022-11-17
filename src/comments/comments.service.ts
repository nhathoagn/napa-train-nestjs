import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesService } from 'src/articles/articles.service';
import { ReplyDto } from 'src/reply/dto/reply.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CommentsDTO } from './dto/comment.dto';

import { CreateCommentDto } from './dto/create-comment.dto';

import { Comments } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,
    @Inject(forwardRef(() => ArticlesService))
    private articleService: ArticlesService,
  ) {}
  async create(user: User, comments: CreateCommentDto) {
    const articleId = comments.articleId;
    const article = await this.articleService.findArticle(articleId);
    const createComment = this.commentRepository.create({
      ...comments,
      author: user,
      articles: article,
    });
    await createComment.save();
    await this.commentRepository.update(createComment.id, {
      parent: createComment,
    });

    return createComment;
  }

  async remove(user: User, comments: CommentsDTO) {
    const comment = await this.commentRepository.findOne({
      where: { id: comments.commentId },
      relations: ['author'],
    });
    await comment.remove();
    return comment;
  }

  async findComment(commentId: ReplyDto) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId.commentId },
      relations: ['author', 'children', 'parent'],
    });
    return comment;
  }

  async findOne(commentId: ReplyDto) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId.commentId },
      relations: ['children', 'author', 'articles'],
    });
    return comment;
  }

  async editComment(user: User, comments: CommentsDTO) {
    const comment = await this.findComment(comments);
    if (user.id == comment.author.id) {
      comment.content = comments.content;
      await comment.save();
    }
    return comment;
  }
}
