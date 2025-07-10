import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsNumber()
  movie_id: number;

  @IsNotEmpty()
  @IsNumber()
  room_id: number;

  @IsNotEmpty()
  @IsDateString()
  starts_at: string;

  @IsNotEmpty()
  @IsDateString()
  ends_at: string;
}
