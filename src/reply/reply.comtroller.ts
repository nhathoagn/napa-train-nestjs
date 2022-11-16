import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { ReplyDto } from './dto/reply.dto';
import { ReplyService } from './reply.service';

@ApiBearerAuth()
@ApiTags('reply')
@UseGuards(JwtAuthGuard)
@Controller()
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}
  @Post('reply/:commentId')
  createReplyComment(
    @CurrentUser() user: User,
    @Body() comments: CreateCommentDto,
    @Param() commentId: ReplyDto,
  ) {
    return this.replyService.createReply(user, comments, commentId);
  }
}
