import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSessionSeatDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  session_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  seats_id: Array<number>;
}
