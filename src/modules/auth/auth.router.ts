import { Body, Controller, Post } from '@nestjs/common';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { AuthController } from './auth.controller';
import { skip } from 'node:test';
import { SkipAuth } from './auth.decorator';

@Controller('auth')
export class AuthRouter {
  constructor(private readonly $authController: AuthController) {}

  @SkipAuth()
  @Post('signin')
  async signin(@Body() body: SigninAuthDto) {
    return await this.$authController.signin(body);
  }
}
