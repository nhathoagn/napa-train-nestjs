import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  @Post('/signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @ApiCreatedResponse({
    description: 'login',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot login. Try again!' })
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      msg: 'success',
    };
  }
}
