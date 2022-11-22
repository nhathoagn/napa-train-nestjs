import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { User } from './typeorm/entities/User';

@Module({
  imports: [
    CloudinaryModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'google_oauth2_app',
      entities: [User],
      synchronize: true,
    }),
    PassportModule.register({session: true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
