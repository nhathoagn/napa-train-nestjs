import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from './entities/article.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Articles]), PassportModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, JwtStrategy],
})
export class ArticlesModule {}
