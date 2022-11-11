import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesService } from 'src/articles/articles.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateCommentDto } from './dto/create-comment.dto';

import { Comments } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments) private commentRepository: Repository<Comments>,
    private articleService: ArticlesService,
  ) {}
  async create(user: User, comments: CreateCommentDto, articleId: number) {
    const createComment = this.commentRepository.create(comments);
    createComment.author = user;
    const comment = await createComment.save();
    const article = await this.articleService.findArticle(articleId);
    article.comments.push(comment);
    return this.commentRepository.findOne({
      where: { content: comments.content },
      relations: ['articles', 'author'],
    });
  }

  async remove(user: User, id: number) {
    console.log('id', id);

    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    await comment.remove();
    return comment;
  }
}
