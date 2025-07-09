import { MovieClassification } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  in_theaters: boolean;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @IsNotEmpty()
  @IsEnum(MovieClassification)
  classification: MovieClassification;
}
