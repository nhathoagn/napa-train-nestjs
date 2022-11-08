import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { CreateTokenDto } from './dto/create-token.dto';
import { response } from 'express';
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
      const userExit = await this.UserService.findByEmail({ email: dto.email });

      if (userExit) {
        throw new BadRequestException('Email exits');
      }
      const user = this.UserService.create({ ...dto, password: hash });
      return user;
    } catch (error) {
      throw new ForbiddenException('Credentials taken');
    }
  }
  async signin(dto: AuthDto) {
    const userExit = await this.UserService.findByEmail({ email: dto.email });
    const userPassword = userExit.password;
    if (!userExit) {
      throw new ForbiddenException('Credentials taken');
    }
    const isMatch = await argon.verify(userPassword, dto.password);
    if (!isMatch) {
      throw new ForbiddenException('Credentials taken');
    }
    const token = await this.signToken({
      userId: userExit.id.toString(),
      email: userExit.email,
    });
    console.log('token11', token);

    return token;
  }
  async signToken(tokenDto: CreateTokenDto): Promise<{ access_token: string }> {
    const payload = {
      sub: tokenDto.userId,
      email: tokenDto.email,
    };
    const secretKey = this.config.get('JWT_SECRET');
    console.log('secretKey', secretKey);

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secretKey,
    });

    return {
      access_token: token,
    };
  }
  async validateUser(dto: AuthDto) {
    const user = await this.UserService.findByEmail({ email: dto.email });
    if (!user) {
      return null;
    }
    return user;
  }
}
