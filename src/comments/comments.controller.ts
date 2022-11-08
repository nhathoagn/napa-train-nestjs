import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { InfoArticle } from 'src/articles/dto/info-article.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
@UseGuards(JwtAuthGuard)
@Controller('/article/')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/:id/comment')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('id') idArticle: number,
  ) {
    console.log('req', createCommentDto, idArticle);

    return this.commentsService.create(createCommentDto, idArticle);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
