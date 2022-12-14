import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { InfoUserDto } from 'src/user/dto/info-user.dto';
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
  signup(@Body() dto: AuthDto) {
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

    return { token: token, msg: 'signin success' };
  }
  @ApiBadRequestResponse({ description: 'error. Try again!' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@CurrentUser() user: InfoUserDto) {
    this.authService.logout(user);
    return {
      msg: 'log success',
    };
  }
}
