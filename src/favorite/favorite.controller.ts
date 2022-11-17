import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InfoArticle } from 'src/articles/dto/info-article.dto';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { FavoriteService } from './favorite.service';
// export interface Favorite {
//   articleId: number;
// }
@ApiBearerAuth()
@ApiTags('favorite')
@UseGuards(JwtAuthGuard)
@Controller()
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
  @Post('favorite')
  async favoriteArticle(
    @Body() params: InfoArticle,
    @CurrentUser() user: User,
  ) {
    return await this.favoriteService.favoriteArticle(params, user);
  }

  @Delete('unfavorite')
  async unfavoriteArticle(
    @Body() articleId: InfoArticle,
    @CurrentUser() user: User,
  ) {
    return await this.favoriteService.unfavoriteArticle(articleId, user);
  }
}
