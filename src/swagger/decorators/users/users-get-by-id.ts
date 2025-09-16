import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function users_get_by_id() {
  return applyDecorators(
    Get('/:id'),
    ApiOperation({ summary: 'Get by id de users.' }),
  );
}
