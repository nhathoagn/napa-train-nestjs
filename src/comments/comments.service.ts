import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesService } from 'src/articles/articles.service';
import { Articles } from 'src/articles/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

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
  async create(user: User, comments: CreateCommentDto, articleId: number) {
    const article = await this.articleService.findArticle(articleId);
    console.log('article', article);

    const createComment = this.commentRepository.create(comments);
    createComment.author = user;
    createComment.articles = article;
    await createComment.save();
    return { msg: 'comments success' };
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
