import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function sessions_get_by_id() {
  return applyDecorators(
    Get('/:id'),
    ApiOperation({ summary: 'Get by id de sessions.' }),
  );
}
