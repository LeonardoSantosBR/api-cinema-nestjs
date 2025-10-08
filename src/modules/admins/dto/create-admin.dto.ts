import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { sanitizeCpf } from 'src/helpers/sanitize.cpf.helper';

export class CreateAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => sanitizeCpf(value))
  cpf: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;
}
