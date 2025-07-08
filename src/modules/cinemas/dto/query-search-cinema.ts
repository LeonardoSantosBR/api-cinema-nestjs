import { IsOptional, IsString } from 'class-validator';
import { GlobalAllDto } from 'src/common/dto';

export class querySearchCinemas extends GlobalAllDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location: string;
}
