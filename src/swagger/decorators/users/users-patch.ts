import { applyDecorators, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export function users_patch() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de users.' }),
    ApiBody({ type: CreateUserDto }),
  );
}
