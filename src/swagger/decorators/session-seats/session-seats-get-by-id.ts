import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function session_seats_get_by_id() {
  return applyDecorators(
    Get('/:id'),
    ApiOperation({ summary: 'Get by id de session-seats.' }),
  );
}
