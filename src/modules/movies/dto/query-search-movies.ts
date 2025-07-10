import { IsOptional, IsString } from 'class-validator';
import { GlobalAllDto } from 'src/common/dto';

export class querySearchMovies extends GlobalAllDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  synopsis: string;
}
