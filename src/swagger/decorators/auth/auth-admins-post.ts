import { applyDecorators, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SkipAuth } from 'src/decorators';
import { SigninAuthDto } from 'src/modules/auth/dto/signin-auth.dto';

export function auth_admins_signin() {
  return applyDecorators(
    SkipAuth(),
    Post('signin-admin'),
    ApiOperation({ summary: 'Login de Administradores.' }),
    ApiBody({ type: SigninAuthDto }),
  );
}
