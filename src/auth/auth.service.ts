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
import { RefeshToken } from './dto/refeshToken.dto';
import { LogoutDto } from './dto/logout.dto';
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
      username: userExit.username,
    });
    await this.updateRefeshToken({
      userId: userExit.id,
      refeshToken: token.refeshToken,
    });
    return token;
  }
  async logout(logout: LogoutDto) {
    this.UserService.update(logout.userId, {
      refeshToken: '',
    });
  }
  async signToken(
    tokenDto: CreateTokenDto,
  ): Promise<{ access_token: string; refeshToken: string }> {
    const payload = {
      id: tokenDto.userId,
      email: tokenDto.email,
      username: tokenDto.username,
    };
    const secretKey = this.config.get('JWT_SECRET');
    const refeshKey = this.config.get('JWT_REFRESH_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secretKey,
    });
    const refeshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: refeshKey,
    });
    return {
      access_token: token,
      refeshToken: refeshToken,
    };
  }
  async updateRefeshToken(updateRTDto: RefeshToken) {
    const hashedRefreshToken = await argon.hash(updateRTDto.refeshToken);
    await this.UserService.update(updateRTDto.userId, {
      refeshToken: hashedRefreshToken,
    });
  }
  async validateUser(dto: AuthDto) {
    const user = await this.UserService.findByEmail({ email: dto.email });
    console.log('22', user);

    if (!user) {
      return null;
    }
    return user;
  }
}
