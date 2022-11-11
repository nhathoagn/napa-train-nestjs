import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'The email of the User',
    example: 'hoang@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'hoang123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The username of the User',
    example: 'hoangnhat',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username: string;
}
