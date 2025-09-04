import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { UsersService } from '../users/users.service';
import { HashService } from 'src/services';

@Injectable()
export class AuthController {
  constructor(
    private readonly $authService: AuthService,
    private readonly $usersService: UsersService,
    private readonly $hashService: HashService,
  ) {}

  async signin(@Body() body: SigninAuthDto) {
    const { cpf, password } = body;
    const user = await this.$usersService.findOne(undefined, {
      where: { cpf },
      select: {
        id: true,
        cpf: true,
        name: true,
        password: true,
      },
    });

    if (!user) throw new BadRequestException('Usuário não encontrado.');
    const pass_valid = await this.$hashService.compare(password, user.password);
    if (!pass_valid) throw new BadRequestException('Senha inválida.');
    return await this.$authService.getCredentials({
      id: user.id,
      name: user.name,
      cpf: user.cpf,
    });
  }
}
