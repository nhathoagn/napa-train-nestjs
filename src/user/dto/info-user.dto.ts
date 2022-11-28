import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class InfoUserDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsOptional()
  @IsEmail()
  email: string;
}
