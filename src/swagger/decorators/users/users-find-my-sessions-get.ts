import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function users_find_my_sessions_get_id() {
  return applyDecorators(
    Get('/find-my-sessions'),
    ApiOperation({ summary: 'Get sessões dos users.' }),
  );
}
