import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { ReplyCommentDto } from './dto/createReplyComment.dto';
import { ReplyService } from './reply.service';

@ApiBearerAuth()
@ApiTags('reply')
@UseGuards(JwtAuthGuard)
@Controller()
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post('reply')
  createReplyComment(
    @CurrentUser() user: User,
    @Body() comments: ReplyCommentDto,
  ) {
    return this.replyService.createReply(user, comments);
  }
}
