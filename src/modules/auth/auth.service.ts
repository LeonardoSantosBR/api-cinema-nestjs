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
    roles,
  }: {
    id: number;
    name: string;
    cpf: string;
    roles?: string;
  }) {
    const access_token = this.$jwtService.sign(
      {
        id,
        name,
        cpf,
        roles,
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
      roles,
      access_token,
      refresh_token,
    };
  }
}
