import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'firstName of the user ',
    example: 'nhat',
  })
  @IsString()
  firstName?: string;
  @ApiProperty({
    description: 'lastName of the user ',
    example: 'hoang',
  })
  @IsString()
  lastName?: string;
  @ApiProperty({
    description: 'address of the user ',
    example: 'danang',
  })
  @IsString()
  address?: string;
}
