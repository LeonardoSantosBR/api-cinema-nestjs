import { applyDecorators, Delete, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function movies_delete() {
  return applyDecorators(
    Delete('/:id'),
    ApiOperation({ summary: 'Delete de movies.' }),
  );
}
