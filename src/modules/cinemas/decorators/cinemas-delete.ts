import { applyDecorators, Delete, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function cinemas_delete() {
  return applyDecorators(
    Delete('/:id'),
    ApiOperation({ summary: 'Delete de cinemas.' }),
  );
}
