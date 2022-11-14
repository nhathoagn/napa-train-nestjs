import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FavoriteService } from 'src/favorite/favorite.service';
import { InfoUser } from 'src/user/dto/info-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Articles } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private articlesRepository: Repository<Articles>,
    private userService: UserService,
    private favoriteService: FavoriteService,
  ) {}
  create(createArticleDto: CreateArticleDto, user: InfoUser) {
    const article = this.articlesRepository.create({
      ...createArticleDto,
      user,
    });
    return this.articlesRepository.save(article);
  }
  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<CreateArticleDto>> {
    const queryBuilder = this.articlesRepository.createQueryBuilder('article');
    queryBuilder.orderBy('article.id', 'ASC');
    queryBuilder.leftJoinAndSelect('article.comments', 'comments');
    return paginate<CreateArticleDto>(queryBuilder, options);
  }
  findAll() {
    return this.articlesRepository.find();
  }
  async findArticle(id: number) {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    return article;
  }
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.articlesRepository.findOneBy({ id });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.findOne(id);
    if (!article) {
      throw new NotFoundException('user not found');
    }
    return this.articlesRepository.save({ ...article, ...updateArticleDto });
  }

  async remove(id: number) {
    const article = await this.findOne(id);
    if (!article) {
      throw new NotFoundException('user not found');
    }
    return this.articlesRepository.remove(article);
  }

  async favoriteArticle(articleId: number, user: User) {
    // const article = await this.articlesRepository.findOne({
    //   where: { id: articleId },
    // });
    // article.favoritesBy = user;
    // const favorite = await this.userService.findUserFavorites(user.id);
    // favorite.favorites.push(article);
    // favorite.save();
    // return await this.articlesRepository.find({
    //   where: {
    //     id: articleId,
    //   },
    //   relations: ['favoritesBy'],
    // });
    const article = await this.articlesRepository.findOne({
      where: { id: articleId },
    });
    await this.favoriteService.createFavorite(article, user);
    return { msg: 'success' };
  }
  async unfavoriteArticle(articleId: number, user: User) {
    // const article = await this.articlesRepository.findOne({
    //   where: { id: articleId },
    //   relations: ['favorites'],
    // });
    await this.favoriteService.removeFavorite(articleId, user);
    // const unfavorite = await this.userService.unfavorite(articleId, user);
    return await this.articlesRepository.findOne({
      where: {
        id: articleId,
      },
      relations: ['favorites'],
    });
  }
}
