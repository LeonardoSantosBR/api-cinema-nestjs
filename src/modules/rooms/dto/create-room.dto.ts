import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSeatsDto {
  @IsOptional()
  @IsNumber()
  seat_id: number;

  @IsNotEmpty()
  @IsNumber()
  seat_number: number;

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
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  cinema_id: number;

  @IsNotEmpty()
  @IsArray()
  rows: Array<CreateRowsDto>;
}
