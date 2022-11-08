import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'firstName of the user ',
    example: 'nhat',
  })
  @IsString()
  @IsOptional()
  firstName?: string;
  @ApiProperty({
    description: 'lastName of the user ',
    example: 'hoang',
  })
  @IsString()
  @IsOptional()
  lastName?: string;
  @ApiProperty({
    description: 'address of the user ',
    example: 'danang',
  })
  @IsOptional()
  @IsString()
  address?: string;
  @IsOptional()
  @IsString()
  refeshToken: string;
}
