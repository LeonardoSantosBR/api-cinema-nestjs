import { ApiProperty } from '@nestjs/swagger';
import { MovieClassification } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  in_theaters: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  duration: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MovieClassification)
  classification: MovieClassification;
}
