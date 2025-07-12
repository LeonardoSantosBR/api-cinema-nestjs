import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { sanitizeCpf } from 'src/helpers/sanitize.cpf.helper';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => sanitizeCpf(value))
  cpf: string;

  @IsOptional()
  @IsString()
  password?: string;
}
