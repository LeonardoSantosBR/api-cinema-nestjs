import { applyDecorators, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateSessionDto } from 'src/modules/sessions/dto/create-session.dto';

export function sessions_post() {
  return applyDecorators(
    Post(),
    ApiOperation({ summary: 'Create de sessions.' }),
    ApiBody({ type: CreateSessionDto }),
  );
}
