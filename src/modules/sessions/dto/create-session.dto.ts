import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  movie_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  room_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  starts_at: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  ends_at: string;
}
