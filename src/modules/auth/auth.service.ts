import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private $jwtService: JwtService) {}

  getCredentials({
    id,
    name,
    cpf,
    role,
  }: {
    id: number;
    name: string;
    cpf: string;
    role: string;
  }) {
    const access_token = this.$jwtService.sign(
      {
        id,
        name,
        cpf,
        role,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1H',
      },
    );

    const refresh_token: string = uuidv4();

    return {
      id,
      name,
      access_token,
      refresh_token,
    };
  }
}
