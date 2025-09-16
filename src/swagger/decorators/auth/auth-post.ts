import { applyDecorators, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SkipAuth } from 'src/decorators';
import { SigninAuthDto } from 'src/modules/auth/dto/signin-auth.dto';

export function auth_signin() {
  return applyDecorators(
    SkipAuth(),
    Post('signin'),
    ApiOperation({ summary: 'Login de usuários.' }),
    ApiBody({ type: SigninAuthDto }),
  );
}
