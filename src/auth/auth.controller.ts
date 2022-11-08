import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
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
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InfoUser } from 'src/user/dto/info-user.dto';
import { get } from 'http';
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
  @ApiBadRequestResponse({ description: 'error. Try again!' })
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@CurrentUser() user: InfoUser) {
    console.log('req', user);
    this.authService.logout(user);
    return {
      msg: 'log success',
    };
  }
}
