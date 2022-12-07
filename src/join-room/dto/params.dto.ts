import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ParamsDTO {
  @IsOptional()
  @IsNumber()
  roomId: number;

  @IsOptional()
  @IsNumber()
  userId: number;
}
