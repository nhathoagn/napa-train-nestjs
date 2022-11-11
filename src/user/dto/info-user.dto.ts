import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class InfoUser {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsOptional()
  @IsEmail()
  email: string;
}
export interface UserResponse {
  email: string;
  username?: string;
}
export interface ProfileResponse extends UserResponse {
  following: boolean | null;
}
