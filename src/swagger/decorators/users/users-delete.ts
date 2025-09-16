import { applyDecorators, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function users_delete() {
  return applyDecorators(
    Delete('/:id'),
    ApiOperation({ summary: 'Delete de users.' }),
  );
}
