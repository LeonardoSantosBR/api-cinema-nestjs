import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSessionSeatDto {
  @IsNotEmpty()
  @IsNumber()
  session_id: number;

  @IsNotEmpty()
  @IsNumber()
  seat_id: number;
}
