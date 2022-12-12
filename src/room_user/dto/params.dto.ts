import { IsNumber, IsOptional } from 'class-validator';

export class ParamsDTO {
  @IsOptional()
  @IsNumber()
  roomId: number;

  @IsOptional()
  @IsNumber()
  userId: number;
}
