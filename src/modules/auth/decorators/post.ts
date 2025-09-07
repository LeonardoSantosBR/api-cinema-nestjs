import { applyDecorators, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SkipAuth } from 'src/decorators';

export function auth_signin() {
  return applyDecorators(
    SkipAuth(),
    Post('signin'),
    ApiOperation({ summary: 'Login de usuários.' }),
  );
}
