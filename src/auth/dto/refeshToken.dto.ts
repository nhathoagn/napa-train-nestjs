import { IsNumber, IsString } from 'class-validator';

export class RefeshToken {
  @IsNumber()
  userId: number;
  @IsString()
  refeshToken: string;
}
