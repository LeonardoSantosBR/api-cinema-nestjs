import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TypeUsersEnum } from 'src/enums';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { UsersService } from '../users/users.service';
import { HashService } from 'src/services';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class AuthController {
  constructor(
    private readonly $authService: AuthService,
    private readonly $usersService: UsersService,
    private readonly $adminsService: AdminsService,
    private readonly $hashService: HashService,
  ) {}

  async signin(@Body() body: SigninAuthDto) {
    const { cpf, password } = body;
    const user: any = await this.$usersService.findOne(undefined, {
      where: { cpf },
      select: {
        id: true,
        cpf: true,
        name: true,
        password: true,
        userRoles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (!user) throw new UnauthorizedException('Usuário não encontrado.');
    const pass_valid = await this.$hashService.compare(password, user.password);
    if (!pass_valid) throw new UnauthorizedException('Senha inválida.');
    return this.$authService.getCredentials({
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      roles: user.userRoles?.map((ur) => {
        return ur.role.name;
      }),
    });
  }
  async signinAdmin(@Body() body: SigninAuthDto) {
    const { cpf, password } = body;
    const admins = await this.$adminsService.findOne(undefined, {
      where: { cpf },
      select: {
        id: true,
        cpf: true,
        name: true,
        password: true,
      },
    });
    if (!admins) throw new BadRequestException('Administrador não encontrado.');
    const pass_valid = await this.$hashService.compare(
      password,
      admins.password,
    );
    if (!pass_valid) throw new BadRequestException('Senha inválida.');
    return this.$authService.getCredentials({
      id: admins.id,
      name: admins.name,
      cpf: admins.cpf,
    });
  }
}
