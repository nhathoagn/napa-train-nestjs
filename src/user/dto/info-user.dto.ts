import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class InfoUser {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsOptional()
  @IsEmail()
  email: string;
}
