import { applyDecorators, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function session_seats_delete() {
  return applyDecorators(
    Delete('/:id'),
    ApiOperation({ summary: 'Delete de session-seats.' }),
  );
}
