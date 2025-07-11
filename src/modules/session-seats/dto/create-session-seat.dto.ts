import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSessionSeatDto {
  @IsNotEmpty()
  @IsNumber()
  session_id: number;

  @IsNotEmpty()
  @IsArray()
  seats_id: Array<number>;
}
