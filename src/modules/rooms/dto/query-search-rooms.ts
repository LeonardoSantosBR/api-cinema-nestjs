import { IsOptional, IsString } from 'class-validator';
import { GlobalAllDto } from 'src/common/dto';

export class querySearchRooms extends GlobalAllDto {
  @IsOptional()
  @IsString()
  name: string;
}
