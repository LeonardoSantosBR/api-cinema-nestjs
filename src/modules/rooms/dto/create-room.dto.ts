import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSeatsDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  seat_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  seat_number: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_accessible: boolean;
}

export class CreateRowsDto {
  @IsOptional()
  @IsNumber()
  row_id: number;

  @IsNotEmpty()
  @IsString()
  row_label: string;

  @IsNotEmpty()
  @IsArray()
  seats: Array<CreateSeatsDto>;
}

export class CreateRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cinema_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  rows: Array<CreateRowsDto>;
}
