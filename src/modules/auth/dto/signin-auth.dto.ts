import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
