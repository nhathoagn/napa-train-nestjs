import { Body, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { AuthDto } from '../dto/auth.dto';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(@Body() dto: AuthDto): Promise<User> {
    const user = await this.authService.validateUser(dto);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
