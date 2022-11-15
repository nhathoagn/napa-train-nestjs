import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from 'src/articles/articles.service';
import { InfoArticle } from 'src/articles/dto/info-article.dto';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { FavoriteService } from './favorite.service';

@ApiBearerAuth()
@ApiTags('reply')
@UseGuards(JwtAuthGuard)
@Controller('articles')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
  @Post(':articleId/favorite')
  async favoriteArticle(
    @Param('articleId') articleId: InfoArticle,
    @CurrentUser() user: User,
  ) {
    return await this.favoriteService.favoriteArticle(articleId, user);
  }

  @Post(':articleId/unfavorite')
  async unfavoriteArticle(
    @Param('articleId') articleId: InfoArticle,
    @CurrentUser() user: User,
  ) {
    return await this.favoriteService.unfavoriteArticle(articleId, user);
  }
}
