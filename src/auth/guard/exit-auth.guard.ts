import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefeshToken extends AuthGuard('jwt-refresh') {}
