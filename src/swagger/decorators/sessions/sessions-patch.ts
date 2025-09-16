import { applyDecorators, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateSessionDto } from 'src/modules/sessions/dto/create-session.dto';

export function sessions_patch() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de sessions.' }),
    ApiBody({ type: CreateSessionDto }),
  );
}
