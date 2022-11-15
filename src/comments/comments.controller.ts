import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiBearerAuth()
@ApiTags('comments')
@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentsService) {}
  @Post(':articleId')
  createComment(
    @CurrentUser() user: User,
    @Body() comments: CreateCommentDto,
    @Param('articleId') articleId: number,
  ) {
    return this.commentService.create(user, comments, articleId);
  }
  @Delete(':articleId')
  removeComment(@CurrentUser() user: User, @Param('id') id: number) {
    return this.commentService.remove(user, id);
  }
}
