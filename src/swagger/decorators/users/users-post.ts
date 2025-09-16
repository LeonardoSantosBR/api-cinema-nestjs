import { applyDecorators, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SkipAuth } from 'src/decorators';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export function users_post() {
  return applyDecorators(
    SkipAuth(),
    Post(),
    ApiOperation({ summary: 'Create de users.' }),
    ApiBody({ type: CreateUserDto }),
  );
}
