import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entities/comment.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  imports: [
    forwardRef(() => ArticlesModule),
    TypeOrmModule.forFeature([Comments]),
  ],
  providers: [CommentsService, JwtAuthGuard],
  exports: [CommentsService],
})
export class CommentsModule {}
