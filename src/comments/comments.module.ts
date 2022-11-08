import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entities/comment.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  controllers: [CommentsController],
  providers: [CommentsService, JwtAuthGuard],
})
export class CommentsModule {}
