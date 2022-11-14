import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from 'src/articles/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}
  createFavorite(createFavorite: Articles, user: User) {
    const favorite = this.favoriteRepository.create({
      articles: createFavorite,
      user: user,
    });
    return this.favoriteRepository.save(favorite);
  }
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
  async removeFavorite(articleId: number, user: User) {
    const favorite = await this.findFavorite(articleId, user);
    if (!favorite) {
      throw new NotFoundException('user not found');
    }
    return this.favoriteRepository.remove(favorite);
  }
}
