import { applyDecorators, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function sessions_delete() {
  return applyDecorators(
    Delete('/:id'),
    ApiOperation({ summary: 'Delete de sessions.' }),
  );
}
