import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async validate(auth: AuthDto): Promise<User> {
    const user = await this.authService.validateUser({
      email: auth.email,
      password: auth.password,
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
