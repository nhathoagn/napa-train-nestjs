import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesService } from 'src/articles/articles.service';
import { InfoArticle } from 'src/articles/dto/info-article.dto';
import { Articles } from 'src/articles/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @Inject(forwardRef(() => ArticlesService))
    private articlesService: ArticlesService,
  ) {}
  async findFavorite(articleId: number, user: User) {
    if (!articleId) {
      return null;
    }
    const query = await this.favoriteRepository
      .createQueryBuilder('unfavorite')
      .select('id')
      .where('articlesId =:articlesid', { articlesid: articleId })
      .andWhere('userId =:userId', { userId: user.id })
      .execute();
    return query;
  }
  async favoriteArticle(articleId: InfoArticle, user: User) {
    const article = await this.articlesService.find(articleId);
    const favorite = this.favoriteRepository.create({
      articles: article,
      user: user,
    });
    await this.favoriteRepository.save(favorite);
    return { msg: 'success' };
  }
  async unfavoriteArticle(article: InfoArticle, user: User) {
    const articleId = article.articleId;
    const favorite = await this.findFavorite(articleId, user);
    if (!favorite) {
      throw new NotFoundException('user not found');
    }
    return this.favoriteRepository.remove(favorite);
  }
}
