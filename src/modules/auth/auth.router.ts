import { Body, Controller } from '@nestjs/common';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { AuthController } from './auth.controller';
import { auth_signin } from 'src/swagger/decorators/auth';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('autenticação')
@Controller('auth')
export class AuthRouter {
  constructor(private readonly $authController: AuthController) {}

  @auth_signin()
  async signin(@Body() body: SigninAuthDto) {
    return await this.$authController.signin(body);
  }
}
