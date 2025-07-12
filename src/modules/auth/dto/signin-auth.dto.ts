import { IsNotEmpty, IsString } from 'class-validator';

export class SigninAuthDto {
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
