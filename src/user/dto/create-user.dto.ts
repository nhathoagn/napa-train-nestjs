import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the User',
    example: 'hoang@gmail.com',
  })
  @IsEmail()
  email?: string;
  @ApiProperty({
    description: 'The password of the User',
    example: 'hoang123',
  })
  @IsString()
  password?: string;
}
