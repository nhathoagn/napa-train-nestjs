import { forwardRef, Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from './entities/article.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Articles]),
    forwardRef(() => CommentsModule),
    PassportModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, JwtStrategy],
  exports: [ArticlesService],
})
export class ArticlesModule {}
