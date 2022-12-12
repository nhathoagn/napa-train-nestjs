import { IsString } from 'class-validator';

export class JwtDTO {
  @IsString()
  token: string;
}
