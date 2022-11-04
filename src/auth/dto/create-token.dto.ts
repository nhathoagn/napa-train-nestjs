import { IsEmail, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  userId: string;
  @IsEmail()
  email: string;
}
