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
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { InfoUser } from 'src/user/dto/info-user.dto';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FilterArticlesDto } from './dto/article.dto';
@ApiBearerAuth()
@ApiTags('articles')
@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @CurrentUser() user: InfoUser,
  ) {
    return this.articlesService.create(createArticleDto, user);
  }

  @Get()
  async findAll(
    @Query() filter: FilterArticlesDto
  ): Promise<Pagination<CreateArticleDto>> {
    const options: IPaginationOptions = {
      limit: filter.limit,
      page: filter.page,
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
}
