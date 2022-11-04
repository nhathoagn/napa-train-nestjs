import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private UserService: UserService,
  ) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const userExit = await this.UserService.find({ email: dto.email });
      if (userExit.length > 0) {
        throw new BadRequestException('Email exits');
      }
      const user = this.UserService.create({ ...dto, password: hash });
      return user;
    } catch (error) {
      throw new ForbiddenException('Credentials taken');
    }
  }
  async signin(dto: AuthDto) {
    const userExit = await this.UserService.find({ email: dto.email });
    const userPassword = userExit[0].password;
    if (!userExit) {
      throw new ForbiddenException('Credentials taken');
    }
    const isMatch = await argon.verify(userPassword, dto.password);
    if (!isMatch) {
      throw new ForbiddenException('Credentials taken');
    }
    return this.signToken({
      userId: userExit[0].id.toString(),
      email: userExit[0].email,
    });
  }
  async signToken(tokenDto: CreateTokenDto): Promise<{ access_token: string }> {
    const payload = {
      sub: tokenDto.userId,
      email: tokenDto.email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
  async validateUser(dto: AuthDto) {
    const user = await this.UserService.find({ email: dto.email });
    const password = dto.password;
    const isMatch = await argon.verify(user[0].password, password);
    if (!isMatch) {
      return null;
    }
  }
}
