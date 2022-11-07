import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  console.log('token', token);

  return token;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }
  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}
