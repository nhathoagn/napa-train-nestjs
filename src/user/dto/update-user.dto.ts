import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  password?: string;
  @IsString()
  firstName?: string;
  @IsString()
  lastName?: string;
  @IsString()
  address?: string;
}
