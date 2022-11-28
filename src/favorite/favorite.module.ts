import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from 'src/articles/articles.module';
import { FavoriteController } from './favorite.controller';
import { Favorite } from './favorite.entity';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    forwardRef(() => ArticlesModule),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
