import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { request } from 'https';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @Post('/signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
  @Get('/token')
  getToken(@Req() req: Request) {
    const cookie = req.cookies;
    console.log('adsd', cookie);

    return cookie;
  }
}
