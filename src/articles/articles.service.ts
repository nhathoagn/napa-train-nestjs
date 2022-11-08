import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InfoUser } from 'src/user/dto/info-user.dto';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Articles } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  @InjectRepository(Articles) private articlesRepository: Repository<Articles>;
  create(createArticleDto: CreateArticleDto, user: InfoUser) {
    console.log('article', createArticleDto);

    const article = this.articlesRepository.create({
      ...createArticleDto,
      user,
    });
    return this.articlesRepository.save(article);
  }

  findAll() {
    return this.articlesRepository.find();
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
}
