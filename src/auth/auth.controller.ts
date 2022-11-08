import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  @Post('/signup')
  signup(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signup(dto);
  }
  @ApiCreatedResponse({
    description: 'login',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot login. Try again!' })
  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    const token = await this.authService.signin(dto);
    console.log('return token', token);

    return { msg: 'signin success' };
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return {
      msg: 'log success',
    };
  }
}
