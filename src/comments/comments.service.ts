import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InfoArticle } from 'src/articles/dto/info-article.dto';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  @InjectRepository(Comments) private commentRepository: Repository<Comments>;
  create(createCommentDto: CreateCommentDto, idArticle: number) {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      idArticle,
    });
    // return this.commentRepository.save(comment);
    return 0;
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
