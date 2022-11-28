import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { InfoUserDto } from 'src/user/dto/info-user.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { InfoArticle } from './dto/info-article.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto copy';
import { PaginationDTO } from './dto/pagination.dto';
import { PageMetaDto } from './dto/pagination.meta';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Articles } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private articlesRepository: Repository<Articles>,
    private userService: UserService,
  ) {}

  async create(createArticleDto: CreateArticleDto, user: InfoUserDto) {
    const currentUser = await this.userService.findByEmail(user);
    const article = this.articlesRepository.create({
      ...createArticleDto,
      user: currentUser,
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

  // async getAll({ limit, skip }: PaginationDTO) {
  //   const articles = this.articlesRepository.find({
  //     relations: ['comments'],
  //     skip: skip,
  //     take: limit,
  //   });
  //   return articles;
  // }

  async getAll(pagiantion: PageOptionsDto): Promise<PageDto<CreateArticleDto>> {
    const query = this.articlesRepository.createQueryBuilder('article');
    query
      .orderBy('article.id', pagiantion.order)
      .skip(pagiantion.skip)
      .take(pagiantion.take)
      .leftJoinAndSelect('article.comments', 'comments');
    const itemCount = await query.getCount();
    const { entities } = await query.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pagiantion });
    return new PageDto(entities, pageMetaDto);
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

  async find(articleId: InfoArticle) {
    return await this.articlesRepository.findOne({
      where: { id: articleId.articleId },
    });
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
}
