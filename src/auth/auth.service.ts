import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}
  async signup(dto: CreateAuthDto) {
    return 'dasd';
  }
  async signin(dto: CreateAuthDto) {
    return 'dasd';
  }
}
