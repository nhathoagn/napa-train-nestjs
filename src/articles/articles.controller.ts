import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { InfoUser } from 'src/user/dto/info-user.dto';
import { User } from 'src/user/entities/user.entity';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentsDTO } from 'src/comments/dto/comment.dto';
import { InfoArticle } from './dto/info-article.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Articles } from './entities/article.entity';
@ApiBearerAuth()
@ApiTags('articles')
@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    @Inject(forwardRef(() => CommentsService))
    private commentService: CommentsService,
  ) {}

  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @CurrentUser() user: InfoUser,
  ) {
    return this.articlesService.create(createArticleDto, user);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 1,
  ): Promise<Pagination<CreateArticleDto>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.articlesService.paginate(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findArticle(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }

  @Post(':articleId/comment')
  createComment(
    @CurrentUser() user: User,
    @Body() comments: CreateCommentDto,
    @Param('articleId') articleId: number,
  ) {
    const comment = this.commentService.create(user, comments, articleId);
    return comment;
  }

  @Delete(':articleId/comment/:id')
  removeComment(@CurrentUser() user: User, @Param('id') id: number) {
    const comment = this.commentService.remove(user, id);
    return comment;
  }

  @Post(':articleId/favorite')
  async favoriteArticle(
    @Param('articleId') articleId: number,
    @CurrentUser() user: User,
  ) {
    const article = await this.articlesService.favoriteArticle(articleId, user);
    return { article };
  }

  @Post(':articleId/unfavorite')
  async unfavoriteArticle(
    @Param('articleId') articleId: number,
    @CurrentUser() user: User,
  ) {
    const article = await this.articlesService.unfavoriteArticle(
      articleId,
      user,
    );
    return { article };
  }
}
