import { IsOptional } from 'class-validator';
import { TransformSort, TransformToNumber } from 'src/helpers';

export class GlobalAllDto {
  @IsOptional()
  search: string;

  @IsOptional()
  @TransformToNumber()
  page: number;

  @IsOptional()
  @TransformToNumber()
  limit: number;

  @IsOptional()
  @TransformSort()
  order: any;
}
