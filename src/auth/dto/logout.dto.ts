import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class LogoutDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
