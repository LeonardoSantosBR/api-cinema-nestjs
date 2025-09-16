import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function session_seats_get() {
  return applyDecorators(
    Get(),
    ApiOperation({ summary: 'Get de session-seats.' }),
  );
}
