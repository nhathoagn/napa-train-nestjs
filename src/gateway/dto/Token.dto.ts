import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class TokenDTO {
  @Type(() => Number)
  id: number;

  @Type(() => String)
  @IsEmail()
  email: string;

  @Type(() => String)
  @IsString()
  username: string;
}
