import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { CommentsService } from './comments.service';
import { CommentsDTO } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiBearerAuth()
@ApiTags('comments')
@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  createComment(@CurrentUser() user: User, @Body() comments: CreateCommentDto) {
    return this.commentService.create(user, comments);
  }

  @Delete()
  removeComment(@CurrentUser() user: User, @Body() comments: CommentsDTO) {
    return this.commentService.remove(user, comments);
  }

  @Patch()
  editComment(@CurrentUser() user: User, @Body() comments: CommentsDTO) {
    return this.commentService.editComment(user, comments);
  }
}
